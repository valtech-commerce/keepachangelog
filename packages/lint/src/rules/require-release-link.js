//--------------------------------------------------------
//-- require-release-link
//--------------------------------------------------------
import { Joi } from '@absolunet/joi';
import error   from '../helpers/error';
import extract from '../helpers/extract';


//-- Id
const id = 'require-release-link';


//-- Rule
const rule = ({ data, config: [enabled] }) => {
	if (enabled === true) {

		return extract.links(data).reduce((errors, { link, title }) => {
			if (link === undefined || link === '') {
				errors.push(error(id, `Release {{release}} must contain a link`, { release: title }));
			}

			return errors;
		}, []);
	}

	return [];
};


//-- Options schema
const schema = Joi.any().forbidden();


export { id, rule, schema };
