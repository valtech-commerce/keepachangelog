//--------------------------------------------------------
//-- Parser
//--------------------------------------------------------
import fss                       from '@absolunet/fss';
import { Joi, validateArgument } from '@absolunet/joi';
import parse                     from './helpers/parse';


/**
 * Keep a Changelog parser.
 *
 * @hideconstructor
 */
class KeepAChangelogParser {

	/**
	 * Parse a changelog content.
	 *
	 * @param {string} content - Changelog content.
	 * @returns {KeepAChangelogData} Parsed data.
	 */
	parse(content) {
		validateArgument('content', content, Joi.string().required());

		return parse(content);
	}


	/**
	 * Parse a changelog file.
	 *
	 * @param {string} filePath - Path of the changelog file.
	 * @returns {object<{data: Changelog, raw: string, filePath: string}>} Parsed and raw data.
	 */
	parseFile(filePath) {
		validateArgument('filePath', filePath, Joi.string().required());

		const absoluteFilePath = fss.realpath(filePath);
		const content          = fss.readFile(absoluteFilePath, 'utf8');
		const data             = this.parse(content);

		return { data, raw: content, filePath: absoluteFilePath };
	}

}


export default KeepAChangelogParser;
