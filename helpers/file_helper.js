'use strict';

var fs = require('fs');
var path = require('path');

var fileHelper = {
  /**
   * Read Directory Recursively Synchronously
   * @param  {string} dir
   * @param  {array} filelist
   * @return {array} File list
   */
  readdirRecursSync: function (dir, filelist) {
    filelist = filelist || [];

    var files = fs.readdirSync(dir);

    files.forEach(function (file) {
      file = path.join(dir, file);

      if (fs.statSync(file).isDirectory()) {
        filelist = fileHelper.readdirRecursSync(file, filelist);
      } else {
        filelist.push(file);
      }
    });

    return filelist;
  }
};

module.exports = fileHelper;
