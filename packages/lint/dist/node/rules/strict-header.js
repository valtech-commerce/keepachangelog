"use strict";

exports.schema = exports.rule = exports.id = void 0;
var _joi = require("@absolunet/joi");
var _error = _interopRequireDefault(require("../helpers/error"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//--------------------------------------------------------
//-- strict-header
//--------------------------------------------------------

const HEADER = `
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

`.slice(1, -2);

//-- Id
const id = 'strict-header';

//-- Rule
exports.id = id;
const rule = ({
  data,
  config: [enabled, {
    header = HEADER
  } = {}]
}) => {
  if (enabled === true) {
    if (data.header.raw.trimEnd() !== header) {
      return [(0, _error.default)(id, `Changelog must begin with the standardized header`)];
    }
  }
  return [];
};

//-- Options schema
exports.rule = rule;
const schema = _joi.Joi.object({
  header: _joi.Joi.string()
});
exports.schema = schema;