"use strict";

exports.schema = exports.rule = exports.id = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _joi = require("@absolunet/joi");

var _error = _interopRequireDefault(require("../helpers/error"));

var _extract = _interopRequireDefault(require("../helpers/extract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//--------------------------------------------------------
//-- strict-release-date
//--------------------------------------------------------
const ISO8601_DATE = _moment.default.HTML5_FMT.DATE; //-- Id

const id = 'strict-release-date'; //-- Rule

exports.id = id;

const rule = ({
  data,
  config: [enabled, {
    format = ISO8601_DATE
  } = {}]
}) => {
  if (enabled === true) {
    return _extract.default.dates(data).reduce((errors, {
      date
    }) => {
      if (!(0, _moment.default)(date, format, 'en', true).isValid() || format === '') {
        errors.push((0, _error.default)(id, `Date {{date}} does not respect {{format}} format`, {
          date,
          format
        }));
      }

      return errors;
    }, []);
  }

  return [];
}; //-- Options schema


exports.rule = rule;

const schema = _joi.Joi.object({
  format: _joi.Joi.string().empty()
});

exports.schema = schema;