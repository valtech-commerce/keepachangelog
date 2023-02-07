"use strict";

exports.schema = exports.rule = exports.id = void 0;
var _joi = require("@absolunet/joi");
var _error = _interopRequireDefault(require("../helpers/error"));
var _extract = _interopRequireDefault(require("../helpers/extract"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//--------------------------------------------------------
//-- no-duplicate-changes-types
//--------------------------------------------------------

//-- Id
const id = 'no-duplicate-changes-types';

//-- Rule
exports.id = id;
const rule = ({
  data,
  config: [enabled]
}) => {
  if (enabled === true) {
    const duplicateTypes = data.releases.concat(data.unreleased).reduce((duplicates, release) => {
      const found = [];
      const reported = [];
      return duplicates.concat(..._extract.default.changesTypes(release).reduce((types, {
        type,
        title
      }) => {
        if (found.includes(type) && !reported.includes(type)) {
          types.push({
            type,
            title
          });
          reported.push(type);
        }
        found.push(type);
        return types;
      }, []));
    }, []);
    return duplicateTypes.map(({
      type,
      title
    }) => {
      return (0, _error.default)(id, `Duplicate change type {{type}} under {{release}}`, {
        type,
        release: title
      });
    }, []);
  }
  return [];
};

//-- Options schema
exports.rule = rule;
const schema = _joi.Joi.any().forbidden();
exports.schema = schema;