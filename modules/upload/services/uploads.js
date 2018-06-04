'use strict';

const Promise = require('promise');
const Model = require('./../models/upload');

exports.save = async (fileName, files) => {
  return await Model.uploadFile(fileName, files);
};
