"use strict";

exports.schema = exports.rule = exports.id = void 0;
var _joi = require("@absolunet/joi");
var _error = _interopRequireDefault(require("../helpers/error"));
var _extract = _interopRequireDefault(require("../helpers/extract"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//--------------------------------------------------------
//-- require-release-link
//--------------------------------------------------------

//-- Id
const id = 'require-release-link';

//-- Rule
exports.id = id;
const rule = ({
  data,
  config: [enabled]
}) => {
  if (enabled === true) {
    return _extract.default.links(data).reduce((errors, {
      link,
      title
    }) => {
      if (link === undefined || link === '') {
        errors.push((0, _error.default)(id, `Release {{release}} must contain a link`, {
          release: title
        }));
      }
      return errors;
    }, []);
  }
  return [];
};

//-- Options schema
exports.rule = rule;
const schema = _joi.Joi.any().forbidden();
exports.schema = schema;