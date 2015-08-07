'use strict';

function Controller(config, services, mappers) {
  this.config = config;
  this.services = services;
  this.mappers = mappers;
}

Controller.prototype.helloWorld = function (req, res, next) {
  res.send('Hello World');

  return next();
};

module.exports = Controller;
