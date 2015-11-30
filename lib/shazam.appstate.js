/*jslint vars: true, devel:true, nomen: true, node: true, indent: 2, maxerr: 50*/
/*global describe, it*/
'use strict';

var ShazamAppClass = require("./shazam.app.class.js");

function ShazamAppState() {
  this.coreApp = new ShazamAppClass("CoreApp", "Node application written using Express.", true, true, "http://i.imgur.com/dzL0XOD.jpg", "", "http://i.imgur.com/RB9eM2j.jpg", "");
  this.websiteApp = new ShazamAppClass("Website", "Node application written using Express.", true, true, "http://i.imgur.com/q0Hl2yi.jpg", "", "http://i.imgur.com/nh5yK4i.jpg", "");
  this.desktopApp = new ShazamAppClass("Desktop", "Node application written using Electron.", true, true, "http://i.imgur.com/bXPRvqB.jpg", "", "http://i.imgur.com/IypwgNq.jpg", "");
  this.hardwareApp = new ShazamAppClass("Hardware", "Node application written using Johnny Five.", true, true, "http://i.imgur.com/f7yraoT.jpg", "", "http://i.imgur.com/42vTElU.jpg", "");
  this.consoleApp = new ShazamAppClass("Console", "Node console application.", true, true, "http://i.imgur.com/dzL0XOD.jpg", "https://twitter.com/thesteveorlando/status/658762258609229825/photo/1", "http://i.imgur.com/RB9eM2j.jpg", "");
  this.mobileApp = new ShazamAppClass("Mobile", "Mobile application using Ionic/Cordova.", true, true, "http://i.imgur.com/dzL0XOD.jpg", "", "http://i.imgur.com/lSl3HIl.jpg", "");
  this.isBilly = true;
  this.lastEventSource = "coreApp";
}

module.exports = ShazamAppState;
