//--------------------------------------------------------
//-- Extract helper
//--------------------------------------------------------

/**
 * Extract specifc fields from raw parsed data .
 *
 * @hideconstructor
 */
class ExtractHelper {

	/**
	 * Extract the versions.
	 *
	 * @param {object} data - Raw parsed data.
	 * @returns {Array<{ version: string, title: string }>} List of versions and release titles.
	 */
	versions({ releases }) {
		return releases.map(({ raw: { version, title } }) => {
			return { version, title };
		});
	}


	/**
	 * Extract the links.
	 *
	 * @param {object} data - Raw parsed data.
	 * @returns {Array<{ link: string, title: string }>} List of links and release titles.
	 */
	links({ releases }) {
		return releases.map(({ link, raw: { title } }) => {
			return { link, title };
		});
	}


	/**
	 * Extract the dates.
	 *
	 * @param {object} data - Raw parsed data.
	 * @returns {Array<{ date: string, title: string }>} List of dates and release titles.
	 */
	dates({ releases }) {
		return releases.map(({ raw: { date, title } }) => {
			return { date, title };
		});
	}


	/**
	 * Extract the flags.
	 *
	 * @param {object} data - Raw parsed data.
	 * @returns {Array<{ flag: string, title: string }>} List of flags and release titles.
	 */
	flags({ releases }) {
		return releases.map(({ raw: { flag, title } }) => {
			return { flag, title };
		});
	}


	/**
	 * Extract the details.
	 *
	 * @param {object} data - Raw parsed data.
	 * @returns {Array<{ details: string, title: string }>} List of details and release titles.
	 */
	details({ releases }) {
		return releases.map(({ raw: { details, title } }) => {
			return { details, title };
		});
	}


	/**
	 * Extract the change types.
	 *
	 * @param {object} data - Raw parsed data.
	 * @returns {Array<{ type: string, title: string }>} List of change types and release titles.
	 */
	changesTypes({ raw: { title } = {}, changes = [] }) {
		return changes.map(({ type }) => {
			return { type, title };
		});
	}

}


export default new ExtractHelper();
