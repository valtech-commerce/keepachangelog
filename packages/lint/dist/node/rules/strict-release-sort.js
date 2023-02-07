"use strict";

exports.schema = exports.rule = exports.id = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _semver = _interopRequireDefault(require("semver"));
var _joi = require("@absolunet/joi");
var _error = _interopRequireDefault(require("../helpers/error"));
var _extract = _interopRequireDefault(require("../helpers/extract"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//--------------------------------------------------------
//-- strict-release-sort
//--------------------------------------------------------

const KEY_DATE = 'date';
const KEY_VERSION = 'version';
const SORT_ASC = 'ascendingly';
const SORT_DESC = 'descendingly';

//-- Id
const id = 'strict-release-sort';

//-- Rule
exports.id = id;
const rule = ({
  data,
  config: [enabled, {
    key = KEY_DATE,
    desc = true
  } = {}]
}) => {
  if (enabled === true) {
    const errors = [];
    let source;
    let sorted;
    switch (key) {
      case KEY_DATE:
        source = _extract.default.dates(data).map(({
          date
        }) => {
          return date;
        });
        sorted = source.concat().sort((a, b) => {
          return (0, _moment.default)(a).isBefore(b) ? -1 : 1;
        });
        break;
      case KEY_VERSION:
        source = _extract.default.versions(data).map(({
          version
        }) => {
          return version;
        });
        sorted = source.concat().sort((a, b) => {
          return _semver.default.lt(a, b) ? -1 : 1;
        });
        break;
      default:
        break;
    }
    if (desc) {
      sorted.reverse();
    }
    if (JSON.stringify(source) !== JSON.stringify(sorted)) {
      errors.push((0, _error.default)(id, `Releases must be sorted {{order}} by {{key}}`, {
        order: desc ? SORT_DESC : SORT_ASC,
        key,
        expected: sorted
      }));
    }
    return errors;
  }
  return [];
};

//-- Options schema
exports.rule = rule;
const schema = _joi.Joi.object({
  key: _joi.Joi.string().valid(KEY_DATE, KEY_VERSION),
  desc: _joi.Joi.boolean()
});
exports.schema = schema;