/*jslint vars: true, devel:true, nomen: true, node: true, indent: 2, maxerr: 50*/
/*global describe, it*/
'use strict';


var ShazamAppClass = require("./lib/shazam.app.class.js"),
  app = require("express")(),
  io = require('socket.io')(80),
  pwd = "123456789",
  WEBSITEAPP = "WebsiteApp",
  DESKTOPAPP = "DesktopApp",
  HARDWAREAPP = "HardwareApp",
  CONSOLEAPP = "ConsoleApp",
  MOBILEAPP = "MobileApp",
  COREAPP = "CoreApp",
  allApps = {};

allApps[COREAPP] = new ShazamAppClass("CoreApp", "Node application written using Express.", true, true, "http://i.imgur.com/dzL0XOD.jpg", "https://twitter.com/thesteveorlando/status/658762258609229825/photo/1", "http://i.imgur.com/RB9eM2j.jpg", "http://www.geeksofdoom.com/2012/03/06/hey-everybody-heres-the-first-look-at-dcs-shazam");
allApps[WEBSITEAPP] = new ShazamAppClass("Website", "Node application written using Express.", true, true, "http://i.imgur.com/dzL0XOD.jpg", "https://twitter.com/thesteveorlando/status/658762258609229825/photo/1", "http://i.imgur.com/RB9eM2j.jpg", "http://www.geeksofdoom.com/2012/03/06/hey-everybody-heres-the-first-look-at-dcs-shazam");
allApps[DESKTOPAPP] = new ShazamAppClass("Desktop", "Node application written using Electron.", true, true, "http://i.imgur.com/dzL0XOD.jpg", "ttps://twitter.com/thesteveorlando/status/658762258609229825/photo/1", "http://i.imgur.com/RB9eM2j.jpg", "http://www.geeksofdoom.com/2012/03/06/hey-everybody-heres-the-first-look-at-dcs-shazam");
allApps[HARDWAREAPP] = new ShazamAppClass("Hardware", "Node application written using Johnny Five.", true, true, "http://i.imgur.com/dzL0XOD.jpg", "ttps://twitter.com/thesteveorlando/status/658762258609229825/photo/1", "http://i.imgur.com/RB9eM2j.jpg", "http://www.geeksofdoom.com/2012/03/06/hey-everybody-heres-the-first-look-at-dcs-shazam");
allApps[CONSOLEAPP] = new ShazamAppClass("Console", "Node console application.", true, true, "http://i.imgur.com/dzL0XOD.jpg", "ttps://twitter.com/thesteveorlando/status/658762258609229825/photo/1", "http://i.imgur.com/RB9eM2j.jpg", "http://www.geeksofdoom.com/2012/03/06/hey-everybody-heres-the-first-look-at-dcs-shazam");
allApps[MOBILEAPP] = new ShazamAppClass("Mobile", "Mobile application using Ionic/Cordova.", true, true, "http://i.imgur.com/dzL0XOD.jpg", "ttps://twitter.com/thesteveorlando/status/658762258609229825/photo/1", "http://i.imgur.com/RB9eM2j.jpg", "http://www.geeksofdoom.com/2012/03/06/hey-everybody-heres-the-first-look-at-dcs-shazam");
allApps.isBilly = true;
allApps.lastEventSource = COREAPP;


function incrementShazamState(msgSource) {
  //Iterate the event counter  for everything
  if (msgSource.lastEventSource === WEBSITEAPP && allApps.websiteApp.enabled) {
    allApps.websiteApp.count += 1;
  }

  if (msgSource.lastEventSource === DESKTOPAPP && allApps.desktopApp.enabled) {
    allApps.websiteApp.count += 1;
  }

  if (msgSource.lastEventSource === HARDWAREAPP && allApps.hardwareApp.enabled) {
    allApps.websiteApp.count += 1;
  }

  if (msgSource.lastEventSource === CONSOLEAPP && allApps.consoleApp.enabled) {
    allApps.websiteApp.count += 1;
  }

  if (msgSource.lastEventSource === MOBILEAPP && allApps.mobileApp.enabled) {
    allApps.websiteApp.count += 1;
  }
}

function setShazamState(newShazamState) {
  allApps[WEBSITEAPP] = newShazamState[WEBSITEAPP];
  allApps[DESKTOPAPP] = newShazamState[DESKTOPAPP];
  allApps[HARDWAREAPP] = newShazamState[HARDWAREAPP];
  allApps[CONSOLEAPP] = newShazamState[CONSOLEAPP];
  allApps[MOBILEAPP] = newShazamState[MOBILEAPP];
  allApps.isBilly = newShazamState.isBilly || allApps.isBilly;
  allApps.lastEventSource = newShazamState.lastEventSource || allApps.lastEventSource;
}

io.on("connection", function (socket) {
  console.log("Someone connected");

  function refresh() {
    console.log("Refresh emitted");
    socket.emit("Refresh!", allApps);
  }

  function transform() {
    console.log("Transform emitted");
    socket.emit("Transform!", allApps);
  }

  //Respond to new events with a refresh.
  socket.on("WhatAmI!", function () {
    console.log("WhatAmI!");
    refresh();
  });

  //Set the current state
  socket.on("Admin!", function (msg) {
    if (msg.pwd === pwd) {
      setShazamState(msg.appState);
      refresh();
    }
  });

  //Flip status of billy, increment counters, refresh
  socket.on("Shazam!", function (msg) {
    // console.log("Shazam!");
    //Alternate Billy
    allApps.isBilly = !(allApps.isBilly);

    //Record the Event Source
    allApps.lastEventSource = msg.location;

    //Increment the counter if its enabled
    incrementShazamState(msg.location);

    //save state to db


    //Cause all applications to transform
    // console.log(allApps);
    transform();
  });

  //Output something to console on disconnect
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

});


// app.listen(8080);
