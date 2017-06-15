console.log( '/******************************************' );
console.log( ' ' );

var Botkit = require( 'botkit' );
var timer = {};
var timerCount = 0;
var emailRequestTimer = {};
var archiveTimer = {};
var express = require( 'express' );
var path = require( 'path' );
var app = express();
var server = require( 'http' ).createServer();
var Sellsy = require( 'node-sellsy' );
var guestCount = 3;
var botIdentity = {};
var TIME_BEFORE_EMAIL_REQUEST = 10;
var TIME_BEFORE_ARCHIVE_CHANNEL = 15;
var debug = true;

var context = {
    sellsyTicketid: ''
};

var sellsy = new Sellsy( {
    creds: {
        consumerKey: '5dd2c2992ab7c0fd540ab7212b78f57dd21bc502',
        consumerSecret: '7f732377b191924165f787876031ffbfe830195d',
        userToken: 'bf64efe8686757345c8178768c69cc134c37230b',
        userSecret: '657ca7ba0858f286fdec8478efb42d8fb7036732'
    }
} );

var config = {};
if (process.env.MONGOLAB_URI) {
    var BotkitStorage = require('botkit-storage-mongo');
    config = {
        storage: BotkitStorage({mongoUri: process.env.MONGOLAB_URI}),
    };
} else {
    config = {
        json_file_store: ((process.env.TOKEN)?'./db_slack_bot_ci/':'./db_slack_bot_a/'), //use a different name if an app or CI
    };
}

/**
 * Are being run as an app or a custom integration? The initialization will differ, depending
 */

if (process.env.TOKEN || process.env.SLACK_TOKEN) {
    //Treat this as a custom integration
    var customIntegration = require('./lib/custom_integrations');
    var token = (process.env.TOKEN) ? process.env.TOKEN : process.env.SLACK_TOKEN;
    var controller = customIntegration.configure(token, config, onInstallation);
} else if (process.env.CLIENT_ID && process.env.CLIENT_SECRET && process.env.PORT) {
    //Treat this as an app
    var app = require('./lib/apps');
    var controller = app.configure(process.env.PORT, process.env.CLIENT_ID, process.env.CLIENT_SECRET, config, onInstallation);
} else {
    console.log('Error: If this is a custom integration, please specify TOKEN in the environment. If this is an app, please specify CLIENTID, CLIENTSECRET, and PORT in the environment');
    process.exit(1);
}

var appController = Botkit.slackbot( {
    // debug: false
} );
var appSlack = appController.spawn( {
    token: appToken
} );

// var controller = Botkit.slackbot( {
//     // debug: false
// } );

var bot = controller.spawn( {
    token: botToken
} ).startRTM( function( err, bot, payload ) {
    botIdentity = bot.identifyBot();
} );

var WebSocketServer = require( 'ws' ).Server;
var wss = new WebSocketServer( { server: server } );
var clients = [];

wss.on( 'connection', function( ws ) {

    ws.on( 'close', function( closeEvent ) {
        clients.splice(
            clients.findIndex(
                function( element ) {
                    return element.channel == this;
                },
                'C5B9GMT8W'
            ), 1 );
        // console.log( clients );
    } );
    ws.on( 'message', function( data, flags ) {
        onClientMessage( this, data );
    } );

    // console.log( 'clients : ' + clients );
} );

controller.on( 'ambient', function( bot, message ) {
    if ( debug ) console.log( 'get message from Slack' );
    if ( debug ) console.log( 'clients list : ', clients );
    var WS = clients.find( function( element ) {
        return element.channel == this;
    }, message.channel );
    if ( !isGuestMessage( message ) ) {
        if ( debug ) console.log( 'message has been sent by Support' );
        stopEmailRequestTimer();
        stopArchiveTimer();
        startArchiveTimer( message.channel );
    }
    if ( debug ) console.log( 'addSellsyTicketReply' );

    addSellsyTicketReply( message.channel, 'note', message.text, function() {} );

    WS.ws.send( JSON.stringify( {
            type: 'message',
            message: message.text
        } ),
        function() {}
    );
} );

function delayFonction( duration, toExecute ) {
    return setTimeout( toExecute, duration * 1000 );
}

function stopTimer() {
    clearTimeout( timer );
}

var express = require( 'express' )
    // , path = require('path')
    // , favicon = require('serve-favicon')
    // , logger = require('morgan')
    // , cookieParser = require('cookie-parser')
    ,
    bodyParser = require( 'body-parser' )
    // , conferenceRouter = require('./routes/conference')
    // , tokenRouter = require('./routes/token')
    ,
    app = express();

const util = require( 'util' );

var twilio = require( 'twilio' );

app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use( bodyParser.urlencoded( { extended: true } ) ); // to support URL-encoded bodies

app.post( '/message', function( request, response ) {
    var channel = request.body.channel;
    var message = request.body.message;
    bot.sendWebhook( {
        text: message,
        channel: channel
    } );
} );


server.on( 'request', app );
server.listen( 8080, function() {
    console.log( 'Listening on http://localhost:8080' );
} );


function isGuestMessage( message ) {
    appSlack.api.users.info( {
            user: message.user
        },
        function( err, response ) {
            if ( !err ) {
                return response.user.name.slice( 0, 5 ) == 'guest';
            }
        }
    );
}

function createTicket( message, callback ) {
    if ( debug ) console.log( 'launch new Sellsy ticket creation' );
    var params = {
        ticket: {
            subject: 'From Slack widget',
            requesterEmail: 'none@none.com',
            message: message
        }
    };

    sellsy.api( {
        method: 'Support.create',
        params: params
    } ).then( data => {
        callback( data.response.ticketid );
        if ( debug ) console.log( 'new sellsy ticket : ' + data.response.ticketid );
    } ).catch( e => {
        console.log( 'error:', e );
    } );
}

function addSellsyTicketReply( channelId, type, message, callback ) {
    getChannelName( channelId, function( ticketid ) {
        var params = {
            ticketid: ticketid,
            reply: {
                type: type,
                step: 'active',
                message: message,
            }
        };
        if ( debug ) console.log( 'Variables addSellsyTicketReply : ', { ticketid: ticketid, type: type, message: message } );
        sellsy.api( {
            method: 'Support.reply',
            params: params
        } ).then( data => {
            callback();
        } ).catch( e => {
            console.log( 'error while adding Sellsy ticket reply : ', e );
        } );
    } );
}

function getChannelName( channelId, callback ) {
    appSlack.api.channels.info( {
            channel: channelId
        },
        function( err, response ) {
            if ( !err ) {
                callback( response.channel.name );
            }
        }
    );
}

function archiveChannel( channelId ) {
    appSlack.api.channels.archive( {
        channel: channelId
    } );
}

function checkChannelStatus( channelId, callback ) {
    appSlack.api.channels.info( {
            channel: channelId
        },
        function( err, response ) {
            if ( !err ) {
                if ( response.channel.is_archived ) {
                    if ( debug ) console.log( 'channel ' + channelId + ' is archived' );
                    unArchiveChannel( channelId, callback );
                } else {
                    callback();
                }
            }
        } );
}

function unArchiveChannel( channel, callback ) {
    appSlack.api.channels.unarchive( {
            channel: channel
        },
        function( err, response ) {
            callback();
            if ( debug ) console.log( 'channel ' + channel + ' has been unarchived' );
            inviteBot( channel );
        }
    );
}

function onClientMessage( ws, data ) {
    stopArchiveTimer();
    data = JSON.parse( data );
    var channel = '';
    if ( data.channel == '' ) {
        if ( debug ) console.log( 'no channel # sent by client' );
        createTicket( data.message, function( channelName ) {
            context.sellsyTicketid = channelName;
            appSlack.api.channels.create( {
                    name: channelName
                },
                function( err, response ) {
                    // console.log( response )
                    if ( err ) {
                        console.log( err );
                    } else {
                        clients.push( {
                            id: '1',
                            channel: response.channel.id,
                            ws: ws
                        } );
                        ws.send(
                            JSON.stringify( {
                                type: 'connection',
                                channel: response.channel.id
                            } )
                        );
                        // console.log( 'bot-creation' )

                        inviteBot( response.channel.id );
                        sendMessageToSlack( response.channel.id, data.message );
                        // startEmailRequestTimer( ws );
                    }
                } );
        } );
    } else {
        if ( debug ) console.log( 'client has sent channel # : ' + data.channel );
        checkChannelStatus( data.channel, function() {
            sendMessageToSlack( data.channel, data.message );
            // startEmailRequestTimer( ws );
            addSellsyTicketReply( data.channel, 'email', data.message, function() {} );
        } );
    }
}

function sendMessageToSlack( channel, message ) {
    if ( debug ) console.log( 'send message ' + message + ' to ' + channel );
    bot.say( {
        channel: channel,
        text: message,
        username: 'Guest'
    } );
}

function startEmailRequestTimer( ws ) {
    if ( debug ) console.log( 'start Email Request Timer' );
    emailRequestTimer = setTimeout( function() {
        ws.send( JSON.stringify( {
                type: 'mailRequest'
            } ),
            function() {

            } );

    }, TIME_BEFORE_EMAIL_REQUEST * 1000 );
}

function stopEmailRequestTimer() {
    clearTimeout( emailRequestTimer );
}

function startArchiveTimer( channel ) {
    if ( debug ) console.log( 'start Archive Timer' );
    archiveTimer = setTimeout( function() {
        archiveChannel( channel );
    }, TIME_BEFORE_ARCHIVE_CHANNEL * 1000 );
}

function stopArchiveTimer() {
    if ( archiveTimer !== undefined ) clearTimeout( archiveTimer );
}

function inviteBot( channel ) {
    appSlack.api.channels.invite( {
        channel: channel,
        user: botIdentity.id
    }, function( err, response ) {
        if ( err ) {
            console.log( err );
        } else {
            if ( debug ) console.log( 'Bot invited to channel ' + channel );
            // console.log( response );
        }
    } );
}
