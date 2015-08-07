'use strict';

var fileHelper = require('./helpers/file_helper');
var path = require('path');

/**
 * Initiliazed instances of required Resources
 * @param  {object} config Config object
 * @param  {string} controllerPath Controller path
 * @return {object} Object containing the instantiated plugins, services, mappers, and controllers
 */
function resources(config, controllerPath) {
  var services = {};
  var serviceFiles = [];
  var mappers = {};
  var mapperFiles = [];
  var plugins = {};
  var pluginFiles = [];
  var controllers = {};
  var controllerFiles = [];

  // Plugins
  pluginFiles = fileHelper.readdirRecursSync(path.join(__dirname, '/plugins'));
  pluginFiles.forEach(function (file) {
    var name;

    if (file.indexOf('.js') > -1) {
      name = path.basename(file).replace('.js', '');
      plugins[name] = require(file);
    }
  });

  // Services
  serviceFiles = fileHelper.readdirRecursSync(path.join(__dirname, '/services'));
  serviceFiles.forEach(function (file) {
    var name;

    if (file.indexOf('.js') > -1) {
      name = path.basename(file).replace('.js', '');
      services[name] = new (require(file))(config);
    }
  });

  // Mappers
  mapperFiles = fileHelper.readdirRecursSync(path.join(__dirname, '/mappers'));
  mapperFiles.forEach(function (file) {
    var name;

    if (file.indexOf('.js') > -1) {
      name = path.basename(file).replace('.js', '');
      mappers[name] = new (require(file))(config, services);
    }
  });

  // Controllers
  controllerFiles = fileHelper.readdirRecursSync(controllerPath);
  controllerFiles.forEach(function (file) {
    var name;

    if (file.indexOf('.js') > -1) {
      name = path.basename(file).replace('.js', '');
      controllers[name] =  new (require(file))(config, services, mappers);
    }
  });

  return {
    plugins: plugins,
    services: services,
    mappers: mappers,
    controllers: controllers
  };
}

module.exports = resources;
