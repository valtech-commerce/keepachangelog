//--------------------------------------------------------
//-- strict-release-flag
//--------------------------------------------------------
import { Joi } from '@absolunet/joi';
import error   from '../helpers/error';
import extract from '../helpers/extract';

const FLAGS = [
	'YANKED'
];


//-- Id
const id = 'strict-release-flag';


//-- Rule
const rule = ({ data, config: [enabled, { whitelist = FLAGS } = {}] }) => {
	if (enabled === true) {

		return extract.flags(data).reduce((errors, { flag }) => {

			if (!whitelist.includes(flag) && flag !== undefined) {
				errors.push(error(id, `Release flag {{flag}} is not allowed`, { flag }));
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
