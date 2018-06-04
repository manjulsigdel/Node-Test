'use strict';

exports.makeResponse = (message, data, meta = []) => {
  const response = {
    success: true,
    data: data,
    message: message
  };

  if (meta.length > 0) {
    response['meta'] = meta;
  }
  return response;
};

exports.makeError = (data, message) => {
  const response = {
    success: false,
    // data: data,
    message: message
  };

  if (data) {
    response['data'] = data;
  }
  return response;
};
