//--------------------------------------------------------
//-- strict-release-version
//--------------------------------------------------------
import semver  from 'semver';
import { Joi } from '@absolunet/joi';
import error   from '../helpers/error';
import extract from '../helpers/extract';

const SEMVER = 'semver';


//-- Id
const id = 'strict-release-version';


//-- Rule
const rule = ({ data, config: [enabled, { scheme = SEMVER } = {}] }) => {
	if (enabled === true) {
		return extract.versions(data).reduce((errors, { version }) => {

			let parsedVersion;
			switch (scheme) {

				case SEMVER:
					parsedVersion = (semver.parse(version) || {}).version;
					break;

				default: break;

			}

			if (version !== parsedVersion) {
				errors.push(error(id, `Version {{version}} does not respect {{scheme}} versioning scheme`, { version, scheme }));
			}

			return errors;
		}, []);
	}

	return [];
};


//-- Options schema
const schema = Joi.object({
	scheme: Joi.string().valid(SEMVER)
});


export { id, rule, schema };
