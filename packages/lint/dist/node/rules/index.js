"use strict";

var noDuplicateChangesTypes = _interopRequireWildcard(require("./no-duplicate-changes-types"));

var noDuplicateVersions = _interopRequireWildcard(require("./no-duplicate-versions"));

var requireHeader = _interopRequireWildcard(require("./require-header"));

var requireReleaseDate = _interopRequireWildcard(require("./require-release-date"));

var requireReleaseDetails = _interopRequireWildcard(require("./require-release-details"));

var requireReleaseLink = _interopRequireWildcard(require("./require-release-link"));

var requireReleaseVersion = _interopRequireWildcard(require("./require-release-version"));

var requireUnreleased = _interopRequireWildcard(require("./require-unreleased"));

var requireVersions = _interopRequireWildcard(require("./require-versions"));

var strictChangesTypes = _interopRequireWildcard(require("./strict-changes-types"));

var strictFilename = _interopRequireWildcard(require("./strict-filename"));

var strictHeader = _interopRequireWildcard(require("./strict-header"));

var strictReleaseDate = _interopRequireWildcard(require("./strict-release-date"));

var strictReleaseFlag = _interopRequireWildcard(require("./strict-release-flag"));

var strictReleaseSort = _interopRequireWildcard(require("./strict-release-sort"));

var strictReleaseVersion = _interopRequireWildcard(require("./strict-release-version"));

var strictSpacing = _interopRequireWildcard(require("./strict-spacing"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//--------------------------------------------------------
//-- Rules
//--------------------------------------------------------
module.exports = {
  [noDuplicateChangesTypes.id]: {
    rule: noDuplicateChangesTypes.rule,
    schema: noDuplicateChangesTypes.schema,
    config: [true]
  },
  [noDuplicateVersions.id]: {
    rule: noDuplicateVersions.rule,
    schema: noDuplicateVersions.schema,
    config: [true]
  },
  [requireHeader.id]: {
    rule: requireHeader.rule,
    schema: requireHeader.schema,
    config: [true]
  },
  [requireReleaseDate.id]: {
    rule: requireReleaseDate.rule,
    schema: requireReleaseDate.schema,
    config: [true]
  },
  [requireReleaseDetails.id]: {
    rule: requireReleaseDetails.rule,
    schema: requireReleaseDetails.schema,
    config: [true]
  },
  [requireReleaseLink.id]: {
    rule: requireReleaseLink.rule,
    schema: requireReleaseLink.schema,
    config: [true]
  },
  [requireReleaseVersion.id]: {
    rule: requireReleaseVersion.rule,
    schema: requireReleaseVersion.schema,
    config: [true]
  },
  [requireUnreleased.id]: {
    rule: requireUnreleased.rule,
    schema: requireUnreleased.schema,
    config: [true]
  },
  [requireVersions.id]: {
    rule: requireVersions.rule,
    schema: requireVersions.schema,
    config: [false]
  },
  [strictChangesTypes.id]: {
    rule: strictChangesTypes.rule,
    schema: strictChangesTypes.schema,
    config: [true]
  },
  [strictFilename.id]: {
    rule: strictFilename.rule,
    schema: strictFilename.schema,
    config: [true]
  },
  [strictHeader.id]: {
    rule: strictHeader.rule,
    schema: strictHeader.schema,
    config: [true]
  },
  [strictReleaseDate.id]: {
    rule: strictReleaseDate.rule,
    schema: strictReleaseDate.schema,
    config: [true]
  },
  [strictReleaseFlag.id]: {
    rule: strictReleaseFlag.rule,
    schema: strictReleaseFlag.schema,
    config: [true]
  },
  [strictReleaseSort.id]: {
    rule: strictReleaseSort.rule,
    schema: strictReleaseSort.schema,
    config: [true]
  },
  [strictReleaseVersion.id]: {
    rule: strictReleaseVersion.rule,
    schema: strictReleaseVersion.schema,
    config: [true]
  },
  [strictSpacing.id]: {
    rule: strictSpacing.rule,
    schema: strictSpacing.schema,
    config: [false]
  }
};