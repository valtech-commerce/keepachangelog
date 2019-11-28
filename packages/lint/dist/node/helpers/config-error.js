"use strict";

exports.default = void 0;

//--------------------------------------------------------
//-- Config error
//--------------------------------------------------------

/**
 * Configuration error.
 *
 * @augments Error
 */
class ConfigError extends Error {
  /**
   * Create configuration error.
   *
   * @param {string} message - Configuration error.
   */
  constructor(message) {
    super(message);
    this.name = 'ConfigError';
  }

}

var _default = ConfigError;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;