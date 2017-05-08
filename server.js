var Botkit = require( 'botkit' );
var timer = {};
var timerCount = 0;
var express = require( 'express' );
var path = require( 'path' );
var app = express();
var server = require( 'http' ).createServer();

var WebSocketServer = require( 'ws' ).Server;
var wss = new WebSocketServer( { server: server } );

wss.on( 'connection', function( ws ) {
    var id = setInterval( function() {
        ws.send( JSON.stringify( process.memoryUsage() ), function() { /* ignore errors */ } );
    }, 100 );
    console.log( 'started client interval' );
    ws.on( 'close', function() {
        console.log( 'stopping client interval' );
        clearInterval( id );
    } );
} );

var controller = Botkit.slackbot( {
    debug: true,
} );

var bot = controller.spawn( {
    token: process.env.SLACK_TOKEN
} ).startRTM();

controller.hears( [ 'hello', 'hi' ], 'direct_message,direct_mention,mention,message_received,ambient', function( bot, message ) {
    bot.reply( message, 't\'as un problème ?' );
    stopTimer();
    startTimer( 10, function() {
        bot.reply( message, 'test' );
    } );


    // bot.api.reactions.add( {
    //     timestamp: message.ts,
    //     channel: message.channel,
    //     name: 'robot_face',
    // }, function( err, res ) {
    //     if ( err ) {
    //         bot.botkit.log( 'Failed to add emoji reaction :(', err );
    //     }
    // } );


    // controller.storage.users.get( message.user, function( err, user ) {
    //     if ( user && user.name ) {
    //         bot.reply( message, 'Hello ' + user.name + '!!' );
    //     } else {
    //         bot.reply( message, 'Hello.' );
    //     }
    // } );
} );

controller.hears( 'stop', 'ambient', function( bot, message ) {
    stopTimer();
    bot.reply( message, 'timer stopped' );
} )



controller.hears( [ 'shutdown' ], 'direct_message,direct_mention,mention', function( bot, message ) {

    bot.startConversation( message, function( err, convo ) {

        convo.ask( 'Are you sure you want me to shutdown?', [
            {
                pattern: bot.utterances.yes,
                callback: function( response, convo ) {
                    convo.say( 'Bye!' );
                    convo.next();
                    setTimeout( function() {
                        process.exit();
                    }, 3000 );
                }
            },
            {
                pattern: bot.utterances.no,
                default: true,
                callback: function( response, convo ) {
                    convo.say( '*Phew!*' );
                    convo.next();
                }
        }
        ] );
    } );
} );


controller.hears( [ 'uptime', 'identify yourself', 'who are you', 'what is your name' ],
    'direct_message,direct_mention,mention',
    function( bot, message ) {

        var hostname = os.hostname();
        var uptime = formatUptime( process.uptime() );

        bot.reply( message,
            ':robot_face: I am a bot named <@' + bot.identity.name +
            '>. I have been running for ' + uptime + ' on ' + hostname + '.' );

    } );

function formatUptime( uptime ) {
    var unit = 'second';
    if ( uptime > 60 ) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if ( uptime > 60 ) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if ( uptime != 1 ) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}

function startTimer( limit, callback ) {
    timerCount++;
    if ( timerCount < limit ) {
        timer = setTimeout( startTimer.bind( null, limit, callback ), 1000 )
    } else {
        callback();
    }
}

function stopTimer() {
    clearTimeout( timer );
    timerCount = 0;
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

app.get( '/voice/:clientId', function( request, response ) {
    response.type( 'text/xml' );
    if ( request.params.clientId ) {
        response.send( '<Response><Dial><Client>' + request.params.clientId + '</Client></Dial></Response>' );
    }
} );


server.on( 'request', app );
server.listen( 8080, function() {
    console.log( 'Listening on http://localhost:8080' );
} );
