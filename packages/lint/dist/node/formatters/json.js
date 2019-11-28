"use strict";

exports.formatter = exports.id = void 0;
//--------------------------------------------------------
//-- Formatter - JSON
//--------------------------------------------------------
const id = 'json';
exports.id = id;

const formatter = report => {
  return JSON.stringify(report);
};

exports.formatter = formatter;