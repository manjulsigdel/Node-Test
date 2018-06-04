'use strict';

const express = require('./express/index');
const config = require('./config');
const http = require('http');


const app = express.init();

const httpServer = http.createServer(app);

// Start Server on localhost
httpServer.listen(config.port, config.host, function () {
  console.log('Server listening on port:' + config.port);
});

module.exports = { app };
