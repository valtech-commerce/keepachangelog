//--------------------------------------------------------
//-- Linter
//--------------------------------------------------------
import clone                     from 'clone-deep';
import merge                     from 'deepmerge';
import { Joi, validateArgument } from '@absolunet/joi';
import __                        from '@absolunet/private-registry';
import { parser }                from '@valtech-commerce/keepachangelog-parser';
import formatters                from './formatters';
import ConfigError               from './helpers/config-error';
import defaultRules              from './rules';


/**
 * Keep a Changelog linter.
 *
 * @hideconstructor
 */
class KeepAChangelogLinter {

	/**
	 * Create a Linter.
	 *
	 * @param {object} config - Configurations.
	 */
	constructor(config = {}) {
		validateArgument('config', config, Joi.object().pattern(/.+/u, Joi.array().ordered(Joi.boolean().required(), Joi.any())));

		const rules = clone(defaultRules);

		Object.entries(config).forEach(([id, [enabled, customConfig]]) => {
			if (rules[id]) {

				const { error } = Joi.object({ options: rules[id].schema }).validate({ options: customConfig });
				if (error) {
					throw new ConfigError(`Invalid options for '${id}': ${error.details[0].message}.`);
				}

				const mergedConfig = typeof customConfig !== 'undefined' ? merge(rules[id].config[1] || {}, customConfig) : rules[id].config[1];
				rules[id].config = [enabled, mergedConfig];

			} else {
				throw new ConfigError(`Rule '${id}' does not exists.`);
			}
		});

		__(this).set('rules', rules);
	}


	/**
	 * Execute the linter.
	 *
	 * @async
	 * @param {string} file - Path of the changelog file.
	 * @returns {Promise<{ filePath: string, results: object }>} When method completed.
	 */
	async executeOnFile(file) {
		validateArgument('file', file, Joi.string().required());

		let results = [];
		const { data, filePath } = parser.parseFile(file);

		for (const { rule, config } of Object.values(__(this).get('rules'))) {
			results = results.concat(...await rule({ filePath, data, config }));  // eslint-disable-line no-await-in-loop
		}

		return { filePath, results };
	}


	/**
	 * Retrieve a linter report formatter.
	 *
	 * @param {string} [formatter="stylish"] - Formatter name.
	 * @returns {Function} Formatter.
	 */
	getFormatter(formatter = 'stylish') {
		validateArgument('formatter', formatter, Joi.string().valid(...Object.keys(formatters)).required());

		return formatters[formatter].formatter;
	}

}


export default KeepAChangelogLinter;
