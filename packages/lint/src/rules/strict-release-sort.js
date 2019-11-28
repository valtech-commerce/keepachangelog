//--------------------------------------------------------
//-- strict-release-sort
//--------------------------------------------------------
import moment  from 'moment';
import semver  from 'semver';
import { Joi } from '@absolunet/joi';
import error   from '../helpers/error';
import extract from '../helpers/extract';

const KEY_DATE    = 'date';
const KEY_VERSION = 'version';

const SORT_ASC  = 'ascendingly';
const SORT_DESC = 'descendingly';


//-- Id
const id = 'strict-release-sort';


//-- Rule
const rule = ({ data, config: [enabled, { key = KEY_DATE, desc = true } = {}] }) => {
	if (enabled === true) {
		const errors = [];
		let source;
		let sorted;

		switch (key) {

			case KEY_DATE:
				source = extract.dates(data).map(({ date }) => { return date; });
				sorted = source.concat().sort((a, b) => {
					return moment(a).isBefore(b) ? -1 : 1;
				});
				break;

			case KEY_VERSION:
				source = extract.versions(data).map(({ version }) => { return version; });
				sorted = source.concat().sort((a, b) => {
					return semver.lt(a, b) ? -1 : 1;
				});
				break;

			default: break;

		}

		if (desc) {
			sorted.reverse();
		}

		if (JSON.stringify(source) !== JSON.stringify(sorted)) {
			errors.push(error(id, `Releases must be sorted {{order}} by {{key}}`, { order: desc ? SORT_DESC : SORT_ASC, key, expected: sorted }));
		}

		return errors;
	}

	return [];
};


//-- Options schema
const schema = Joi.object({
	key:  Joi.string().valid(KEY_DATE, KEY_VERSION),
	desc: Joi.boolean()
});


export { id, rule, schema };
