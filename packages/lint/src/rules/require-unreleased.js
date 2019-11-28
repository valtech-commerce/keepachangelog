//--------------------------------------------------------
//-- require-unreleased
//--------------------------------------------------------
import { Joi } from '@absolunet/joi';
import error   from '../helpers/error';


//-- Id
const id = 'require-unreleased';


//-- Rule
const rule = ({ data, config: [enabled] }) => {
	if (enabled === true) {

		// TODO [>=1.1.0]: Validate it is the first entry
		if (!(data.unreleased.raw && data.unreleased.raw.title)) {
			return [error(id, `Changelog must contain an {{unreleased}} section`, { unreleased: 'Unreleased' })];
		}
	}

	return [];
};


//-- Options schema
const schema = Joi.any().forbidden();


export { id, rule, schema };
