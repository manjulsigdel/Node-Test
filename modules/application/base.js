'use strict';

const makeResponse = require('./utils/response').makeResponse;
const makeError = require('./utils/response').makeError;

exports.sendResponse = (result = [], message = "success") => {
  let meta = [];
  if (result.includes('meta')) {
    meta = result[meta];
    result.splice('meta', 1);
  }

  return makeResponse(message, result, meta);
};


exports.sendError = (message = "error", data = null) => {
  return makeError(data, message);
};