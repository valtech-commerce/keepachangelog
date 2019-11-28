"use strict";

exports.formatter = exports.id = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _figures = _interopRequireDefault(require("figures"));

var _pluralize = _interopRequireDefault(require("pluralize"));

var _stripAnsi = _interopRequireDefault(require("strip-ansi"));

var _textTable = _interopRequireDefault(require("text-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//--------------------------------------------------------
//-- Formatter - Stylish
//--------------------------------------------------------
const id = 'stylish';
exports.id = id;

const formatter = ({
  filePath,
  results
}) => {
  const count = results.length;

  if (count > 0) {
    let output = `\n${_chalk.default.underline(filePath)}\n`;
    output += `${(0, _textTable.default)(results.map(result => {
      return ['', _chalk.default.red('error'), result.message.plain, _chalk.default.dim(result.rule || '')];
    }), {
      stringLength: text => {
        return (0, _stripAnsi.default)(text).length;
      }
    })}`;
    output += _chalk.default.red.bold(`\n\n${_figures.default.cross} ${(0, _pluralize.default)('error', count, true)}`); // Resets output color, for prevent change on top level

    return _chalk.default.reset(output);
  }

  return '';
};

exports.formatter = formatter;