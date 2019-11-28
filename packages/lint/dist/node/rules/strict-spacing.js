"use strict";

exports.schema = exports.rule = exports.id = void 0;

var _pluralize = _interopRequireDefault(require("pluralize"));

var _joi = require("@absolunet/joi");

var _error = _interopRequireDefault(require("../helpers/error"));

var _extract = _interopRequireDefault(require("../helpers/extract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//--------------------------------------------------------
//-- strict-spacing
//--------------------------------------------------------
const newlinesPattern = quantity => {
  return new RegExp(`[^\n]\n{${quantity}}$`, 'u');
}; //-- Id


const id = 'strict-spacing'; //-- Rule

exports.id = id;

const rule = ({
  data,
  config: [enabled, {
    header = 6,
    release = 3
  } = {}]
}) => {
  if (enabled === true) {
    const errors = [];

    if (data.header.raw !== '' && !newlinesPattern(header).test(data.header.raw)) {
      errors.push((0, _error.default)(id, `Header must have {{spacing}} before first release`, {
        spacing: (0, _pluralize.default)('newline', header, true)
      }));
    }

    const releases = _extract.default.details(data);

    releases.pop();

    if (data.unreleased.raw) {
      releases.unshift({
        title: data.unreleased.raw.title,
        details: data.unreleased.raw.details
      });
    }

    errors.push(...releases.reduce((releaseErrors, {
      details,
      title
    }) => {
      if (details !== `\n`.repeat(release)) {
        if (!newlinesPattern(release + 1).test(details)) {
          releaseErrors.push((0, _error.default)(id, `Release {{release}} must have {{spacing}} before next release`, {
            release: title,
            spacing: (0, _pluralize.default)('newline', release, true)
          }));
        }
      }

      return releaseErrors;
    }, []));
    return errors;
  }

  return [];
}; //-- Options schema


exports.rule = rule;

const schema = _joi.Joi.object({
  header: _joi.Joi.number().integer().positive(),
  release: _joi.Joi.number().integer().positive()
});

exports.schema = schema;