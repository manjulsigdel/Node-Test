'use strict';

const UploadService = require('./../services/uploads');
const sendResponse = require('./../../application/base').sendResponse;
const sendError = require('./../../application/base').sendError;

exports.upload = [
  async (req, res, next) => {
    try {
      let data = await UploadService.save(req.x_test, req.images);
      res.json(sendResponse(data, "Image successfully uploaded."));
    } catch (error) {
      res.status(400).json(sendError(error.message, error.data));
    }
  }
];
