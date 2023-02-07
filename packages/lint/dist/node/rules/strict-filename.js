"use strict";

exports.schema = exports.rule = exports.id = void 0;
var _path = _interopRequireDefault(require("path"));
var _joi = require("@absolunet/joi");
var _error = _interopRequireDefault(require("../helpers/error"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//--------------------------------------------------------
//-- strict-filename
//--------------------------------------------------------

const FILENAME = 'CHANGELOG.md';

//-- Id
const id = 'strict-filename';

//-- Rule
exports.id = id;
const rule = ({
  filePath,
  config: [enabled, {
    filename = FILENAME
  } = {}]
}) => {
  if (enabled === true) {
    if (_path.default.basename(filePath) !== filename) {
      return [(0, _error.default)(id, `Filename must be {{filename}}`, {
        filename
      })];
    }
  }
  return [];
};

//-- Options schema
exports.rule = rule;
const schema = _joi.Joi.object({
  filename: _joi.Joi.string()
});
exports.schema = schema;