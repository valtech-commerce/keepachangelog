"use strict";

exports.schema = exports.rule = exports.id = void 0;
var _joi = require("@absolunet/joi");
var _error = _interopRequireDefault(require("../helpers/error"));
var _extract = _interopRequireDefault(require("../helpers/extract"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//--------------------------------------------------------
//-- no-duplicate-versions
//--------------------------------------------------------

//-- Id
const id = 'no-duplicate-versions';

//-- Rule
exports.id = id;
const rule = ({
  data,
  config: [enabled]
}) => {
  if (enabled === true) {
    const found = [];
    const reported = [];
    return _extract.default.versions(data).reduce((errors, {
      version
    }) => {
      if (found.includes(version) && !reported.includes(version)) {
        reported.push(version);
        errors.push((0, _error.default)(id, `Duplicate version {{version}}`, {
          version
        }));
      }
      found.push(version);
      return errors;
    }, []);
  }
  return [];
};

//-- Options schema
exports.rule = rule;
const schema = _joi.Joi.any().forbidden();
exports.schema = schema;