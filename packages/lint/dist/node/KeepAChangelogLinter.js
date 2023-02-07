"use strict";

exports.default = void 0;
var _cloneDeep = _interopRequireDefault(require("clone-deep"));
var _deepmerge = _interopRequireDefault(require("deepmerge"));
var _joi = require("@absolunet/joi");
var _privateRegistry = _interopRequireDefault(require("@absolunet/private-registry"));
var _keepachangelogParser = require("@valtech-commerce/keepachangelog-parser");
var _formatters = _interopRequireDefault(require("./formatters"));
var _configError = _interopRequireDefault(require("./helpers/config-error"));
var _rules = _interopRequireDefault(require("./rules"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//--------------------------------------------------------
//-- Linter
//--------------------------------------------------------

/**
 * Keep a Changelog linter.
 *
 * @hideconstructor
 */
class KeepAChangelogLinter {
  /**
   * Create a Linter.
   *
   * @param {object} config - Configurations.
   */
  constructor(config = {}) {
    (0, _joi.validateArgument)('config', config, _joi.Joi.object().pattern(/.+/u, _joi.Joi.array().ordered(_joi.Joi.boolean().required(), _joi.Joi.any())));
    const rules = (0, _cloneDeep.default)(_rules.default);
    Object.entries(config).forEach(([id, [enabled, customConfig]]) => {
      if (rules[id]) {
        const {
          error
        } = _joi.Joi.object({
          options: rules[id].schema
        }).validate({
          options: customConfig
        });
        if (error) {
          throw new _configError.default(`Invalid options for '${id}': ${error.details[0].message}.`);
        }
        const mergedConfig = typeof customConfig !== 'undefined' ? (0, _deepmerge.default)(rules[id].config[1] || {}, customConfig) : rules[id].config[1];
        rules[id].config = [enabled, mergedConfig];
      } else {
        throw new _configError.default(`Rule '${id}' does not exists.`);
      }
    });
    (0, _privateRegistry.default)(this).set('rules', rules);
  }

  /**
   * Execute the linter.
   *
   * @async
   * @param {string} file - Path of the changelog file.
   * @returns {Promise<{ filePath: string, results: object }>} When method completed.
   */
  async executeOnFile(file) {
    (0, _joi.validateArgument)('file', file, _joi.Joi.string().required());
    let results = [];
    const {
      data,
      filePath
    } = _keepachangelogParser.parser.parseFile(file);
    for (const {
      rule,
      config
    } of Object.values((0, _privateRegistry.default)(this).get('rules'))) {
      results = results.concat(...(await rule({
        filePath,
        data,
        config
      }))); // eslint-disable-line no-await-in-loop
    }

    return {
      filePath,
      results
    };
  }

  /**
   * Retrieve a linter report formatter.
   *
   * @param {string} [formatter="stylish"] - Formatter name.
   * @returns {Function} Formatter.
   */
  getFormatter(formatter = 'stylish') {
    (0, _joi.validateArgument)('formatter', formatter, _joi.Joi.string().valid(...Object.keys(_formatters.default)).required());
    return _formatters.default[formatter].formatter;
  }
}
var _default = KeepAChangelogLinter;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;