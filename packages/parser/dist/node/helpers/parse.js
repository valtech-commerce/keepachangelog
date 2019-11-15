"use strict";

exports.default = void 0;

var _marked = _interopRequireDefault(require("marked"));

var _moment = _interopRequireDefault(require("moment"));

var _semver = _interopRequireDefault(require("semver"));

var _capturingGroupValues = _interopRequireDefault(require("@absolunet/capturing-group-values"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//--------------------------------------------------------
//-- Changelog parser helper
//--------------------------------------------------------
const RELEASE_PATTERN = /^(?<versionFull>\[?(?<version>[^\]\s]+)\]?) - (?<date>[^\n\[]+)(?<flagFull>\[(?<flag>.*)\])?$/u;
const VERSION_LINKED = /^\[.+\]$/u;
const RELEASE_SEPARATOR = '## ';
const CHANGETYPE_SEPARATOR = '### ';
const UNRELEASED = 'Unreleased';
const UNRELEASED_TITLE = `[${UNRELEASED}]`;
const YANKED = 'YANKED'; //-- Split headers

const splitRaw = (rawContent, separator) => {
  const content = rawContent.startsWith(separator) ? `\n${rawContent}` : rawContent;
  return content.split(`\n${separator}`);
}; //-- Remove title


const stripTitle = content => {
  return `${content.split('\n').slice(1).join('\n')}\n`;
}; //-- Extract header and releases


const extractHeaderAndReleases = (tokens, rawContent) => {
  const header = {
    tokens: [],
    raw: rawContent.shift(),
    content: []
  };
  const unreleased = {};
  let detailingUnreleased = false;
  const releases = tokens.reduce((list, token) => {
    const {
      type,
      depth,
      text
    } = token; // New release

    if (type === 'heading' && depth === 2) {
      const rawDetails = stripTitle(rawContent.shift());

      if (text !== UNRELEASED && text !== UNRELEASED_TITLE) {
        list.push({
          tokens: {
            title: token,
            details: []
          },
          raw: {
            title: text,
            details: rawDetails
          }
        });
        detailingUnreleased = false;
      } else {
        unreleased.tokens = {
          title: token,
          details: []
        };
        unreleased.raw = {
          title: text,
          details: rawDetails
        };
        detailingUnreleased = true;
      } // Unreleased details

    } else if (detailingUnreleased) {
      unreleased.tokens.details.push(token); // Release details
    } else if (list.length !== 0) {
      list[list.length - 1].tokens.details.push(token); // Header
    } else {
      header.tokens.push(token);

      if (text) {
        header.content.push(text);
      }
    }

    return list;
  }, []); // Remove trailing linefeed on last release

  if (releases.length !== 0) {
    releases[releases.length - 1].raw.details = releases[releases.length - 1].raw.details.slice(0, -1);
  }

  return {
    header,
    unreleased,
    releases
  };
}; //-- Process releases


const processRelease = (release, links) => {
  const rawDetails = splitRaw(release.raw.details, CHANGETYPE_SEPARATOR);
  release.raw.description = rawDetails.shift(); //-- Parse title

  if (release.raw.title === UNRELEASED_TITLE) {
    release.link = links[UNRELEASED.toLowerCase()] ? links[UNRELEASED.toLowerCase()].href : undefined;
  } else {
    const {
      version,
      versionFull,
      date,
      flag,
      flagFull
    } = (0, _capturingGroupValues.default)(release.raw.title, RELEASE_PATTERN);
    release.raw.version = version || '';
    release.raw.date = date || '';
    release.raw.flag = flagFull ? flag || '' : flag || undefined;
    release.version = _semver.default.parse(version);
    release.date = (0, _moment.default)(date);
    release.yanked = flag === YANKED;

    if (VERSION_LINKED.test(versionFull)) {
      release.link = links[String(version).toLowerCase()] ? links[String(version).toLowerCase()].href : undefined;
    }
  } //-- Parse changes


  release.tokens.description = [];
  release.tokens.changes = [];
  release.raw.changes = [];
  release.description = [];
  release.changes = release.tokens.details.reduce((list, token) => {
    const {
      type,
      depth,
      text
    } = token; // New change type

    if (type === 'heading' && depth === 3) {
      const rawChanges = stripTitle(rawDetails.shift());
      release.tokens.changes.push({
        type: token,
        content: []
      });
      release.raw.changes.push({
        type: text,
        content: rawChanges
      });
      list.push({
        type: text,
        content: []
      }); // Type content
    } else if (list.length !== 0) {
      release.tokens.changes[release.tokens.changes.length - 1].content.push(token);

      if (text) {
        list[list.length - 1].content.push(text);
      } // Description

    } else {
      release.tokens.description.push(token);

      if (text) {
        release.description.push(text);
      }
    }

    return list;
  }, []); // Remove trailing linefeed on last changes group

  if (release.raw.changes.length !== 0) {
    release.raw.changes[release.raw.changes.length - 1].content = release.raw.changes[release.raw.changes.length - 1].content.slice(0, -1);
  }

  return release;
};

var _default = content => {
  _moment.default.suppressDeprecationWarnings = true;

  const tokens = _marked.default.lexer(content);

  const rawContent = splitRaw(content, RELEASE_SEPARATOR);
  let {
    header,
    unreleased,
    releases
  } = extractHeaderAndReleases(tokens, rawContent); // eslint-disable-line prefer-const
  // Process releases

  if (Object.keys(unreleased).length !== 0) {
    unreleased = processRelease(unreleased, tokens.links);
  }

  releases = releases.map(release => {
    return processRelease(release, tokens.links);
  });
  return {
    tokens,
    header,
    unreleased,
    releases
  };
};

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;