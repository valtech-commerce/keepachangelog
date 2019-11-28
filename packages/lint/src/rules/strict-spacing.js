//--------------------------------------------------------
//-- strict-spacing
//--------------------------------------------------------
import pluralize from 'pluralize';
import { Joi }   from '@absolunet/joi';
import error     from '../helpers/error';
import extract   from '../helpers/extract';

const newlinesPattern = (quantity) => {
	return new RegExp(`[^\n]\n{${quantity}}$`, 'u');
};


//-- Id
const id = 'strict-spacing';


//-- Rule
const rule = ({ data, config: [enabled, { header = 6, release = 3 } = {}] }) => {
	if (enabled === true) {
		const errors = [];

		if (data.header.raw !== '' && !newlinesPattern(header).test(data.header.raw)) {
			errors.push(error(id, `Header must have {{spacing}} before first release`, { spacing: pluralize('newline', header, true) }));
		}

		const releases = extract.details(data);
		releases.pop();

		if (data.unreleased.raw) {
			releases.unshift({ title: data.unreleased.raw.title, details: data.unreleased.raw.details });
		}

		errors.push(...releases.reduce((releaseErrors, { details, title }) => {

			if (details !== `\n`.repeat(release)) {
				if (!newlinesPattern(release + 1).test(details)) {
					releaseErrors.push(error(id, `Release {{release}} must have {{spacing}} before next release`, { release: title, spacing: pluralize('newline', release, true) }));
				}
			}

			return releaseErrors;
		}, []));

		return errors;
	}

	return [];
};


//-- Options schema
const schema = Joi.object({
	header:  Joi.number().integer().positive(),
	release: Joi.number().integer().positive()
});


export { id, rule, schema };
