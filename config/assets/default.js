'use strict';

module.exports = {
  server: {
    modules: 'modules/*/index.js',
    models: 'modules/*/models/**/*.js',
    routes: 'modules/*/routes/**/*.js',
    config: 'modules/*/config/*.js',
    tests: ['modules/*/tests/**/*.test.js', 'server/*.test.js']
  }
};