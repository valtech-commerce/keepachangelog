//--------------------------------------------------------
//-- require-release-date
//--------------------------------------------------------
import { Joi } from '@absolunet/joi';
import error   from '../helpers/error';
import extract from '../helpers/extract';


//-- Id
const id = 'require-release-date';


//-- Rule
const rule = ({ data, config: [enabled] }) => {
	if (enabled === true) {

		return extract.dates(data).reduce((errors, { date, title }) => {
			if (date === undefined || date === '') {
				errors.push(error(id, `Release {{release}} must contain a date`, { release: title }));
			}

			return errors;
		}, []);
	}

	return [];
};


//-- Options schema
const schema = Joi.any().forbidden();


export { id, rule, schema };
