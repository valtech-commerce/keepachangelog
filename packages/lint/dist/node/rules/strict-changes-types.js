"use strict";

exports.schema = exports.rule = exports.id = void 0;
var _joi = require("@absolunet/joi");
var _error = _interopRequireDefault(require("../helpers/error"));
var _extract = _interopRequireDefault(require("../helpers/extract"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//--------------------------------------------------------
//-- strict-changes-types
//--------------------------------------------------------

const TYPES = ['Added', 'Changed', 'Deprecated', 'Removed', 'Fixed', 'Security'];

//-- Id
const id = 'strict-changes-types';

//-- Rule
exports.id = id;
const rule = ({
  data,
  config: [enabled, {
    whitelist = TYPES
  } = {}]
}) => {
  if (enabled === true) {
    const allTypes = data.releases.concat(data.unreleased).reduce((types, release) => {
      return types.concat(..._extract.default.changesTypes(release));
    }, []);
    return allTypes.reduce((errors, {
      type,
      title
    }) => {
      if (!whitelist.includes(type)) {
        errors.push((0, _error.default)(id, `Change type {{type}} under {{release}} is not allowed`, {
          type,
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
const schema = _joi.Joi.object({
  whitelist: _joi.Joi.array().items(_joi.Joi.string())
});
exports.schema = schema;