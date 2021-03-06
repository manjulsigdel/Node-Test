'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');

const fileUpload = require('express-fileupload');
const config = require('./../../server/config');

/**
 * Invoke modules server configuration
 */
exports.initModulesConfiguration = function (app) {
  config.files.server.configs.forEach(function (configPath) {
    require(path.resolve(configPath))(app);
  });

  config.files.server.modules.forEach(function (modulePath) {
    require(path.resolve(modulePath));
  });
};

/**
 * Configure the modules server routes
 */
exports.initModulesServerRoutes = function (app) {
  // Globbing routing files
  config.files.server.routes.forEach(function (routePath) {
    require(path.resolve(routePath))(app);
  });
};

exports.initModulesTests = function (app) {
  config.files.server.tests.forEach(function (testPath) {
    require(path.resolve(testPath))(app);
  })
}


exports.init = () => {
  const app = express();

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.json({limit: '100mb'}));
  app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
  app.use(fileUpload());

  exports.initModulesConfiguration(app);

  exports.initModulesServerRoutes(app);

  return app;
};
