//--------------------------------------------------------
//-- strict-release-date
//--------------------------------------------------------
import moment  from 'moment';
import { Joi } from '@absolunet/joi';
import error   from '../helpers/error';
import extract from '../helpers/extract';

const ISO8601_DATE = moment.HTML5_FMT.DATE;


//-- Id
const id = 'strict-release-date';


//-- Rule
const rule = ({ data, config: [enabled, { format = ISO8601_DATE } = {}] }) => {
	if (enabled === true) {
		return extract.dates(data).reduce((errors, { date }) => {

			if (!moment(date, format, 'en', true).isValid() || format === '') {
				errors.push(error(id, `Date {{date}} does not respect {{format}} format`, { date, format }));
			}

			return errors;
		}, []);
	}

	return [];
};


//-- Options schema
const schema = Joi.object({
	format: Joi.string().empty()
});


export { id, rule, schema };
