"use strict";

exports.schema = exports.rule = exports.id = void 0;
var _joi = require("@absolunet/joi");
var _error = _interopRequireDefault(require("../helpers/error"));
var _extract = _interopRequireDefault(require("../helpers/extract"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//--------------------------------------------------------
//-- strict-release-flag
//--------------------------------------------------------

const FLAGS = ['YANKED'];

//-- Id
const id = 'strict-release-flag';

//-- Rule
exports.id = id;
const rule = ({
  data,
  config: [enabled, {
    whitelist = FLAGS
  } = {}]
}) => {
  if (enabled === true) {
    return _extract.default.flags(data).reduce((errors, {
      flag
    }) => {
      if (!whitelist.includes(flag) && flag !== undefined) {
        errors.push((0, _error.default)(id, `Release flag {{flag}} is not allowed`, {
          flag
        }));
      }
      return errors;
    }, []);
  }
  return [];
};

//-- Options schema
exports.rule = rule;
const schema = _joi.Joi.object({
  whitelist: _joi.Joi.array().items(_joi.Joi.string())
});
exports.schema = schema;