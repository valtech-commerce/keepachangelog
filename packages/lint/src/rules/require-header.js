//--------------------------------------------------------
//-- require-header
//--------------------------------------------------------
import { Joi } from '@absolunet/joi';
import error   from '../helpers/error';


//-- Id
const id = 'require-header';


//-- Rule
const rule = ({ data, config: [enabled] }) => {
	if (enabled === true) {
		if (data.header.raw.trim() === '') {
			return [error(id, `Changelog must begin with a header`)];
		}
	}

	return [];
};


//-- Options schema
const schema = Joi.any().forbidden();


export { id, rule, schema };
