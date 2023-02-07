"use strict";

Object.defineProperty(exports, "Parser", {
  enumerable: true,
  get: function () {
    return _KeepAChangelogParser.default;
  }
});
exports.parser = void 0;
var _KeepAChangelogParser = _interopRequireDefault(require("./KeepAChangelogParser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//--------------------------------------------------------
//-- @valtech-commerce/keepachangelog-parser
//--------------------------------------------------------

const parser = new _KeepAChangelogParser.default();

/**
 * Exports the KeepAChangelogParser class.
 *
 * @module @valtech-commerce/keepachangelog-parser
 */

/**
 * KeepAChangelogParser class.
 *
 * @name Parser
 * @type {KeepAChangelogParser}
 **/
exports.parser = parser;