'use strict';

class ValidationErrors extends Error {
  constructor(data = ""){
    super("Validation Errors");
    this.data = data;
  }
}

module.exports = ValidationErrors;