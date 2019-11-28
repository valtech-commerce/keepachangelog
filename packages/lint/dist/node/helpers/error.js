"use strict";

exports.default = void 0;

//--------------------------------------------------------
//-- Linter error helper
//--------------------------------------------------------
const processTemplate = (template, data, valueProcessor) => {
  return Object.entries(data).reduce((message, [key, value]) => {
    return message.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'u'), valueProcessor(value));
  }, template);
};

var _default = (id, template, data = {}) => {
  return {
    rule: id,
    data,
    message: {
      template,
      plain: processTemplate(template, data, value => {
        return `'${value}'`;
      })
    }
  };
};

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;