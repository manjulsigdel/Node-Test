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


exports.init = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(fileUpload());

    const httpServer = http.createServer(app);

    exports.initModulesConfiguration(app);

    exports.initModulesServerRoutes(app);

    return httpServer;
};
