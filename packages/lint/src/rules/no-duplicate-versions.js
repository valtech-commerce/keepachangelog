//--------------------------------------------------------
//-- no-duplicate-versions
//--------------------------------------------------------
import { Joi } from '@absolunet/joi';
import error   from '../helpers/error';
import extract from '../helpers/extract';


//-- Id
const id = 'no-duplicate-versions';


//-- Rule
const rule = ({ data, config: [enabled] }) => {
	if (enabled === true) {
		const found    = [];
		const reported = [];

		return extract.versions(data).reduce((errors, { version }) => {
			if (found.includes(version) && !reported.includes(version)) {
				reported.push(version);
				errors.push(error(id, `Duplicate version {{version}}`, { version }));
			}

			found.push(version);

			return errors;
		}, []);
	}

	return [];
};


//-- Options schema
const schema = Joi.any().forbidden();


export { id, rule, schema };
