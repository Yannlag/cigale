{
  "apps" : [{
    "name"        : "slack",
    "script"      : "./server.js",
    "watch"       : true,
    "env": {
      	"BEEPBOOP_TOKEN": "51bf6849d59c4121b588f9be01cf761a-1030611439",
      	"CLIENT_ID": 
    },
    "env_production" : {
       "NODE_ENV": "production"
    }
  },{
    "name"       : "api-app",
    "script"     : "./api.js",
    "instances"  : 4,
    "exec_mode"  : "cluster"
  }]
}