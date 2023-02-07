"use strict";

exports.schema = exports.rule = exports.id = void 0;
var _joi = require("@absolunet/joi");
var _error = _interopRequireDefault(require("../helpers/error"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//--------------------------------------------------------
//-- require-unreleased
//--------------------------------------------------------

//-- Id
const id = 'require-unreleased';

//-- Rule
exports.id = id;
const rule = ({
  data,
  config: [enabled]
}) => {
  if (enabled === true) {
    // TODO [>=1.1.0]: Validate it is the first entry
    if (!(data.unreleased.raw && data.unreleased.raw.title)) {
      return [(0, _error.default)(id, `Changelog must contain an {{unreleased}} section`, {
        unreleased: 'Unreleased'
      })];
    }
  }
  return [];
};

//-- Options schema
exports.rule = rule;
const schema = _joi.Joi.any().forbidden();
exports.schema = schema;