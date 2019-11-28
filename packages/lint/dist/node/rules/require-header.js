"use strict";

exports.schema = exports.rule = exports.id = void 0;

var _joi = require("@absolunet/joi");

var _error = _interopRequireDefault(require("../helpers/error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//--------------------------------------------------------
//-- require-header
//--------------------------------------------------------
//-- Id
const id = 'require-header'; //-- Rule

exports.id = id;

const rule = ({
  data,
  config: [enabled]
}) => {
  if (enabled === true) {
    if (data.header.raw.trim() === '') {
      return [(0, _error.default)(id, `Changelog must begin with a header`)];
    }
  }

  return [];
}; //-- Options schema


exports.rule = rule;

const schema = _joi.Joi.any().forbidden();

exports.schema = schema;