'use strict';
const fs = require('fs');

module.exports = (app) => {
  const Controllers = require('./../controllers/uploads');
  const Validations = require('./../validations/upload');

  app.post('/images', Validations.upload, Controllers.upload);

};
