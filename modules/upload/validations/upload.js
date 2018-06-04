'use strict';

const ValidationErrors = require('./../../application/exceptions/ValidationErrors');
const sendResponse = require('./../../application/base').sendResponse;
const sendError = require('./../../application/base').sendError;
const mime = require('mime');

exports.upload = [
  (req, res, next) => {
    const x_testHeader = req.get('x-test');
    const image = req.files ? req.files.images : '';

    let errors = {};
    let x_test = [];
    let images = [];

    console.log(mime.getExtension(image.mimetype));

    try {
      if (this.isEmpty(x_testHeader)) {
        x_test.push("x-test header is required");
        errors.x_test = x_test;
      }

      if (this.isEmpty(image)) {
        images.push("images field must contain a jpg file");
        errors.images = images;
      }

      if(image.length > 1){
        images.push("images field should contain only one jpeg image");
        errors.images = images;
      }

      if(mime.getExtension(image.mimetype) !== "jpeg"){
        images.push("it must be a jpg image");
        errors.images = images;
      }

      if (!this.isEmpty(errors)) {
        throw new ValidationErrors(errors);
      }

      req.x_test = x_testHeader;
      req.images = image;

      next();

    } catch (error) {
      res.status(400).json(sendError(error.message, error.data));
    }
  }
];

exports.isEmpty = (obj) => {
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
};
