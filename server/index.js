'use strict';

const express = require('./express/index');
const config = require('./config');

const httpServer = express.init();

// Start Server on localhost
httpServer.listen(config.port, config.host, function () {
  console.log('Server listening on port:' + config.port);
});