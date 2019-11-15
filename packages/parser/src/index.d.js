/**
 * Keep a Changelog changes group raw tokens.
 *
 * @typedef {object} ChangesTokens
 * @property {MarkedToken} type - Changes type raw tokens.
 * @property {Array<MarkedToken>} content - List of changes raw tokens.
 */


/**
 * Keep a Changelog changes group raw content.
 *
 * @typedef {object} ChangesRaw
 * @property {string} type - Changes type.
 * @property {string} content - Raw changes.
 */


/**
 * Keep a Changelog changes group.
 *
 * @typedef {object} Changes
 * @property {string} type - Changes type.
 * @property {Array<string>} content - List of changes.
 */


/**
 * Keep a Changelog release data.
 *
 * @typedef {object} Release
 *
 * @property {object} tokens - Whole release raw tokens.
 * @property {MarkedToken} tokens.title - Title raw token.
 * @property {Array<MarkedToken>} tokens.details - Whole details raw tokens.
 * @property {Array<MarkedToken>} tokens.description - Description raw tokens.
 * @property {Array<ChangesTokens>} tokens.changes - Changes group raw tokens.
 *
 * @property {object} raw - Raw data.
 * @property {string} raw.title - Raw whole title.
 * @property {string} raw.version - Raw version.
 * @property {string} raw.date - Raw date.
 * @property {string} raw.flag - Raw flag information.
 * @property {string} raw.details - Raw whole details.
 * @property {string} raw.description - Raw description.
 * @property {Array<ChangesRaw>} raw.changes - List of raw changes group.
 *
 * @property {SemVer} version - Release version.
 *
 * @property {Moment} date - Release date.
 *
 * @property {boolean} yanked - Has release been yanked.
 *
 * @property {string} link - Release link.
 *
 * @property {Array<string>} description - Release description.
 *
 * @property {Array<Changes>} changes - List of changes.
 */


/**
 * A Keep a Changelog data.
 *
 * @typedef {object} Changelog
 *
 * @property {Array<MarkedToken>} tokens - Whole changelog raw tokens.
 *
 * @property {object} header - Changelog header.
 * @property {Array<MarkedToken>} header.tokens - Header raw tokens.
 * @property {string} header.raw - Header raw content.
 * @property {Array<string>} header.content - Header content.
 *
 * @property {Release} unreleased - Unreleased data.
 *
 * @property {Array<Release>} releases - Releases data.
 */
