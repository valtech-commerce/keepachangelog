//--------------------------------------------------------
//-- Rules
//--------------------------------------------------------
import * as noDuplicateChangesTypes from './no-duplicate-changes-types';
import * as noDuplicateVersions     from './no-duplicate-versions';

import * as requireHeader           from './require-header';
import * as requireReleaseDate      from './require-release-date';
import * as requireReleaseDetails   from './require-release-details';
import * as requireReleaseLink      from './require-release-link';
import * as requireReleaseVersion   from './require-release-version';
import * as requireUnreleased       from './require-unreleased';
import * as requireVersions         from './require-versions';

import * as strictChangesTypes      from './strict-changes-types';
import * as strictFilename          from './strict-filename';
import * as strictHeader            from './strict-header';
import * as strictReleaseDate       from './strict-release-date';
import * as strictReleaseFlag       from './strict-release-flag';
import * as strictReleaseSort       from './strict-release-sort';
import * as strictReleaseVersion    from './strict-release-version';
import * as strictSpacing           from './strict-spacing';


module.exports = {

	[noDuplicateChangesTypes.id]: {
		rule:   noDuplicateChangesTypes.rule,
		schema: noDuplicateChangesTypes.schema,
		config: [true]
	},
	[noDuplicateVersions.id]: {
		rule:   noDuplicateVersions.rule,
		schema: noDuplicateVersions.schema,
		config: [true]
	},


	[requireHeader.id]: {
		rule:   requireHeader.rule,
		schema: requireHeader.schema,
		config: [true]
	},
	[requireReleaseDate.id]: {
		rule:   requireReleaseDate.rule,
		schema: requireReleaseDate.schema,
		config: [true]
	},
	[requireReleaseDetails.id]: {
		rule:   requireReleaseDetails.rule,
		schema: requireReleaseDetails.schema,
		config: [true]
	},
	[requireReleaseLink.id]: {
		rule:   requireReleaseLink.rule,
		schema: requireReleaseLink.schema,
		config: [true]
	},
	[requireReleaseVersion.id]: {
		rule:   requireReleaseVersion.rule,
		schema: requireReleaseVersion.schema,
		config: [true]
	},
	[requireUnreleased.id]: {
		rule:   requireUnreleased.rule,
		schema: requireUnreleased.schema,
		config: [true]
	},
	[requireVersions.id]: {
		rule:   requireVersions.rule,
		schema: requireVersions.schema,
		config: [false]
	},


	[strictChangesTypes.id]: {
		rule:   strictChangesTypes.rule,
		schema: strictChangesTypes.schema,
		config: [true]
	},
	[strictFilename.id]: {
		rule:   strictFilename.rule,
		schema: strictFilename.schema,
		config: [true]
	},
	[strictHeader.id]: {
		rule:   strictHeader.rule,
		schema: strictHeader.schema,
		config: [true]
	},
	[strictReleaseDate.id]: {
		rule:   strictReleaseDate.rule,
		schema: strictReleaseDate.schema,
		config: [true]
	},
	[strictReleaseFlag.id]: {
		rule:   strictReleaseFlag.rule,
		schema: strictReleaseFlag.schema,
		config: [true]
	},
	[strictReleaseSort.id]: {
		rule:   strictReleaseSort.rule,
		schema: strictReleaseSort.schema,
		config: [true]
	},
	[strictReleaseVersion.id]: {
		rule:   strictReleaseVersion.rule,
		schema: strictReleaseVersion.schema,
		config: [true]
	},
	[strictSpacing.id]: {
		rule:   strictSpacing.rule,
		schema: strictSpacing.schema,
		config: [false]
	}

};
