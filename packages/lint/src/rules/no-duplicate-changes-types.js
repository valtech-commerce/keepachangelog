//--------------------------------------------------------
//-- no-duplicate-changes-types
//--------------------------------------------------------
import { Joi } from '@absolunet/joi';
import error   from '../helpers/error';
import extract from '../helpers/extract';


//-- Id
const id = 'no-duplicate-changes-types';


//-- Rule
const rule = ({ data, config: [enabled] }) => {
	if (enabled === true) {

		const duplicateTypes = data.releases.concat(data.unreleased).reduce((duplicates, release) => {
			const found    = [];
			const reported = [];

			return duplicates.concat(...extract.changesTypes(release).reduce((types, { type, title }) => {
				if (found.includes(type) && !reported.includes(type)) {
					types.push({ type, title });
					reported.push(type);
				}

				found.push(type);

				return types;
			}, []));
		}, []);

		return duplicateTypes.map(({ type, title }) => {
			return error(id, `Duplicate change type {{type}} under {{release}}`, { type, release: title });
		}, []);
	}

	return [];
};


//-- Options schema
const schema = Joi.any().forbidden();


export { id, rule, schema };
