"use strict";

exports.schema = exports.rule = exports.id = void 0;
var _semver = _interopRequireDefault(require("semver"));
var _joi = require("@absolunet/joi");
var _error = _interopRequireDefault(require("../helpers/error"));
var _extract = _interopRequireDefault(require("../helpers/extract"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//--------------------------------------------------------
//-- strict-release-version
//--------------------------------------------------------

const SEMVER = 'semver';

//-- Id
const id = 'strict-release-version';

//-- Rule
exports.id = id;
const rule = ({
  data,
  config: [enabled, {
    scheme = SEMVER
  } = {}]
}) => {
  if (enabled === true) {
    return _extract.default.versions(data).reduce((errors, {
      version
    }) => {
      let parsedVersion;
      switch (scheme) {
        case SEMVER:
          parsedVersion = (_semver.default.parse(version) || {}).version;
          break;
        default:
          break;
      }
      if (version !== parsedVersion) {
        errors.push((0, _error.default)(id, `Version {{version}} does not respect {{scheme}} versioning scheme`, {
          version,
          scheme
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
  scheme: _joi.Joi.string().valid(SEMVER)
});
exports.schema = schema;