//--------------------------------------------------------
//-- strict-changes-types
//--------------------------------------------------------
import { Joi } from '@absolunet/joi';
import error   from '../helpers/error';
import extract from '../helpers/extract';

const TYPES = [
	'Added',
	'Changed',
	'Deprecated',
	'Removed',
	'Fixed',
	'Security'
];


//-- Id
const id = 'strict-changes-types';


//-- Rule
const rule = ({ data, config: [enabled, { whitelist = TYPES } = {}] }) => {
	if (enabled === true) {
		const allTypes = data.releases.concat(data.unreleased).reduce((types, release) => {
			return types.concat(...extract.changesTypes(release));
		}, []);

		return allTypes.reduce((errors, { type, title }) => {
			if (!whitelist.includes(type)) {
				errors.push(error(id, `Change type {{type}} under {{release}} is not allowed`, { type, release: title }));
			}

			return errors;
		}, []);
	}

	return [];
};


//-- Options schema
const schema = Joi.object({
	whitelist: Joi.array().items(Joi.string())
});


export { id, rule, schema };
