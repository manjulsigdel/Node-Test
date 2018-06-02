'use strict';

const _ = require('lodash');
const chalk = require('chalk');
const glob = require('glob');
const path = require('path');


/**
 * Get files by glob patterns
 */
const getGlobbedPaths =  (globPatterns, excludes) => {
  // URL paths regex
  const urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

  // The output array
  let output = [];

  // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function (globPattern) {
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      let files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map(function (file) {
          if (_.isArray(excludes)) {
            for (let i in excludes) {
              file = file.replace(excludes[i], '');
            }
          } else {
            file = file.replace(excludes, '');
          }
          return file;
        });
      }
      output = _.union(output, files);
    }
  }

  return output;
};

/**
 * Validate NODE_ENV existance
 */
const validateEnvironmentVariable =  () => {
  const environmentFiles = glob.sync('./config/env/' + process.env.NODE_ENV + '.js');
  if (!environmentFiles.length) {
    if (process.env.NODE_ENV) {
      console.error(chalk.red('No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
    } else {
      console.error(chalk.red('NODE_ENV is not defined! Using default development environment'));
    }
    process.env.NODE_ENV = 'development';
  } else {
    console.log(chalk.bold('Application loaded using the "' + process.env.NODE_ENV + '" environment configuration'));
  }
  // Reset console color
  console.log(chalk.white(''));
};

/**
 * Initialize global configuration files
 */
const initGlobalConfigFolders = function (config, assets) {
  // Appending files
  config.folders = {
    server: {}
  };
};

/**
 * Initialize global configuration files
 */
const initGlobalConfigFiles = function (config, assets) {
  // Appending files
  config.files = {
    server: {}
  };

  // Setting Globbed modules files
  config.files.server.modules = getGlobbedPaths(assets.server.modules);

  // Setting Globbed model files
  config.files.server.models = getGlobbedPaths(assets.server.models);

  // Setting Globbed route files
  config.files.server.routes = getGlobbedPaths(assets.server.routes);


  // Setting Globbed config files
  config.files.server.configs = getGlobbedPaths(assets.server.config);
};

/**
 * Initialize global configuration
 */
const initGlobalConfig = () => {
  // Validate NDOE_ENV existance
  //validateEnvironmentVariable();

  // Get the default assets
  const defaultAssets = require(path.join(process.cwd(), 'config/assets/default'));

  // Merge assets
  const assets = _.merge(defaultAssets);

  // Get the default config
  const defaultConfig = require(path.join(process.cwd(), 'config/env/default'));

  // Get the current config
  //const environmentConfig = require(path.join(process.cwd(), 'config/env/', process.env.NODE_ENV)) || {};

  // Merge config files
  let config = _.merge(defaultConfig);

  const fs = require('fs');
  if (process.env.NODE_ENV === 'test' && fs.existsSync('config/env/local-test.js')) {
    // Merge local config files
    console.log('local-test.js is applied');
    config = _.merge(config, require(path.join(process.cwd(), 'config/env/local-test')));
  }
  else if (fs.existsSync('config/env/local.js')) {
    // Merge local config files
    console.log('local.js is applied');
    config = _.merge(config, require(path.join(process.cwd(), 'config/env/local')));
  }


  // Initialize global globbed files
  initGlobalConfigFiles(config, assets);

  // Initialize global globbed folders
  initGlobalConfigFolders(config, assets);

  // Expose configuration utilities
  config.utils = {
    getGlobbedPaths: getGlobbedPaths
  };

  return config;
};

/**
 * Set configuration object
 */
module.exports = initGlobalConfig();