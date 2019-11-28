//--------------------------------------------------------
//-- require-versions
//--------------------------------------------------------
import { Joi } from '@absolunet/joi';
import error   from '../helpers/error';
import extract from '../helpers/extract';


//-- Id
const id = 'require-versions';


//-- Rule
const rule = ({ data, config: [enabled, { versions = [] } = {}] }) => {
	if (enabled === true) {
		const allVersions = extract.versions(data).map(({ version }) => { return version; });

		return versions.reduce((errors, version) => {
			if (!allVersions.includes(version)) {
				errors.push(error(id, `Changelog must contain a release for version {{version}}`, { version }));
			}

			return errors;
		}, []);
	}

	return [];
};


//-- Options schema
const schema = Joi.object({
	versions: Joi.array().items(Joi.string())
});


export { id, rule, schema };
