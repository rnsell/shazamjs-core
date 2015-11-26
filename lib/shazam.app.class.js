/*jslint vars: true, devel:true, nomen: true, node: true, indent: 2, maxerr: 50*/
/*global describe, it*/
'use strict';


function ShazamApp(shazamHeader, appDesc, visible, enabled, billyImg, billySrc, shazamImg, shazamSrc) {
  this.shazamHeader = shazamHeader;
  this.appDesc = appDesc;
  this.visible = visible;
  this.enabled = enabled;
  this.billyImg = billyImg;
  this.billySrc = billySrc;
  this.shazamImg = shazamImg;
  this.shazamSrc = shazamSrc;
  this.count = 0;
}


module.exports = ShazamApp;
