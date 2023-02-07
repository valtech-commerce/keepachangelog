"use strict";

exports.default = void 0;
var _fss = _interopRequireDefault(require("@absolunet/fss"));
var _joi = require("@absolunet/joi");
var _parse = _interopRequireDefault(require("./helpers/parse"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//--------------------------------------------------------
//-- Parser
//--------------------------------------------------------

/**
 * Keep a Changelog parser.
 *
 * @hideconstructor
 */
class KeepAChangelogParser {
  /**
   * Parse a changelog content.
   *
   * @param {string} content - Changelog content.
   * @returns {KeepAChangelogData} Parsed data.
   */
  parse(content) {
    (0, _joi.validateArgument)('content', content, _joi.Joi.string().required());
    return (0, _parse.default)(content);
  }

  /**
   * Parse a changelog file.
   *
   * @param {string} filePath - Path of the changelog file.
   * @returns {object<{data: Changelog, raw: string, filePath: string}>} Parsed and raw data.
   */
  parseFile(filePath) {
    (0, _joi.validateArgument)('filePath', filePath, _joi.Joi.string().required());
    const absoluteFilePath = _fss.default.realpath(filePath);
    const content = _fss.default.readFile(absoluteFilePath, 'utf8');
    const data = this.parse(content);
    return {
      data,
      raw: content,
      filePath: absoluteFilePath
    };
  }
}
var _default = KeepAChangelogParser;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;