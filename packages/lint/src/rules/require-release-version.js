//--------------------------------------------------------
//-- require-release-version
//--------------------------------------------------------
import { Joi } from '@absolunet/joi';
import error   from '../helpers/error';
import extract from '../helpers/extract';


//-- Id
const id = 'require-release-version';


//-- Rule
const rule = ({ data, config: [enabled] }) => {
	if (enabled === true) {
		return extract.versions(data).reduce((errors, { version, title }) => {
			if (version === undefined || version === '') {
				errors.push(error(id, `Release {{release}} must contain a version`, { release: title }));
			}

			return errors;
		}, []);
	}

	return [];
};


//-- Options schema
const schema = Joi.any().forbidden();


export { id, rule, schema };
