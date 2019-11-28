"use strict";

exports.schema = exports.rule = exports.id = void 0;

var _joi = require("@absolunet/joi");

var _error = _interopRequireDefault(require("../helpers/error"));

var _extract = _interopRequireDefault(require("../helpers/extract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//--------------------------------------------------------
//-- require-versions
//--------------------------------------------------------
//-- Id
const id = 'require-versions'; //-- Rule

exports.id = id;

const rule = ({
  data,
  config: [enabled, {
    versions = []
  } = {}]
}) => {
  if (enabled === true) {
    const allVersions = _extract.default.versions(data).map(({
      version
    }) => {
      return version;
    });

    return versions.reduce((errors, version) => {
      if (!allVersions.includes(version)) {
        errors.push((0, _error.default)(id, `Changelog must contain a release for version {{version}}`, {
          version
        }));
      }

      return errors;
    }, []);
  }

  return [];
}; //-- Options schema


exports.rule = rule;

const schema = _joi.Joi.object({
  versions: _joi.Joi.array().items(_joi.Joi.string())
});

exports.schema = schema;