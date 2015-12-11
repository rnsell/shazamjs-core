/*jslint vars: true, devel:true, nomen: true, node: true, indent: 2, maxerr: 50*/
/*global describe, it*/
'use strict';


var ShazamAppClass = require("./lib/shazam.app.class.js"),
  ShazamAppState = require("./lib/shazam.appstate.js"),
  adminPwd = require("./lib/env.js"),
  app = require('express')(),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  port = process.env.PORT || 8080,
  pwd = "123456789",
  connections = 0,
  allApps = new ShazamAppState();


//Start the server
server.listen(port, function () {
  console.log("Listening on port " + port);
});

//Set a function on the root url to indicate the server is running
app.use("/", function (request, response) {
  response.send({
    message: "server running."
  });
});

//Transform function
function transform() {
  console.log("Transform emitted");
  io.emit("Transform!", allApps);
}

function refresh(){
  io.emit("Refresh!", allApps);
}
//shazam process to transform
function onShazam(msg) {
  var lastEventSource = msg.location;

  if (allApps[lastEventSource].enabled) {
    //Billy transformed
    allApps.isBilly = !(allApps.isBilly);
    //Record the Event Source
    allApps.lastEventSource = msg.location;
    //Increment the counter
    allApps[lastEventSource].count += 1;

    //Transform
    transform();
  }
}

function onAdminUpdate(msg){
  var newState = msg.appState;

  newState.coreApp.count = allApps.coreApp.count;
  newState.websiteApp.count = allApps.websiteApp.count;
  newState.desktopApp.count = allApps.desktopApp.count;
  newState.hardwareApp.count = allApps.hardwareApp.count;
  newState.consoleApp.count = allApps.consoleApp.count;
  newState.mobileApp.count = allApps.mobileApp.count;

  if(msg.pwd === adminPwd){
    //Depending on when the socket is handled it may not have the corrent counts
    newState.coreApp.count = allApps.coreApp.count;
    newState.websiteApp.count = allApps.websiteApp.count;
    newState.desktopApp.count = allApps.desktopApp.count;
    newState.hardwareApp.count = allApps.hardwareApp.count;
    newState.consoleApp.count = allApps.consoleApp.count;
    newState.mobileApp.count = allApps.mobileApp.count;
    allApps = newState;
    refresh();
  }
}

io.on("connection", function (socket) {

  connections = connections + 1;
  console.log("User connected. Number of connections: " + connections);

  //Output something to console on disconnect
  socket.on('disconnect', function () {
    connections = connections - 1;
    console.log("User disconnected. Number of connections: " + connections);
  });


  socket.on("Admin Update", onAdminUpdate);

  //Respond to new events with a refresh.
  socket.on("Who am I?", function () {
    socket.emit("Refresh!", allApps);
  });

  socket.on("Admin Update", onAdminUpdate);
  //Flip status of billy, increment counters, refresh
  socket.on("Shazam!", onShazam);
});


// app.listen(8080);
