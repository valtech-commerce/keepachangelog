//--------------------------------------------------------
//-- require-release-details
//--------------------------------------------------------
import { Joi } from '@absolunet/joi';
import error   from '../helpers/error';
import extract from '../helpers/extract';


//-- Id
const id = 'require-release-details';


//-- Rule
const rule = ({ data, config: [enabled] }) => {
	if (enabled === true) {

		return extract.details(data).reduce((errors, { details, title }) => {
			if (details.trim() === '') {
				errors.push(error(id, `Release {{release}} must contain details`, { release: title }));
			}

			return errors;
		}, []);
	}

	return [];
};


//-- Options schema
const schema = Joi.any().forbidden();


export { id, rule, schema };
