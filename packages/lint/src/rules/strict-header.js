//--------------------------------------------------------
//-- strict-header
//--------------------------------------------------------
import { Joi } from '@absolunet/joi';
import error   from '../helpers/error';

const HEADER = `
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

`.slice(1, -2);


//-- Id
const id = 'strict-header';


//-- Rule
const rule = ({ data, config: [enabled, { header = HEADER } = {}] }) => {
	if (enabled === true) {
		if (data.header.raw.trimEnd() !== header) {
			return [error(id, `Changelog must begin with the standardized header`)];
		}
	}

	return [];
};


//-- Options schema
const schema = Joi.object({
	header: Joi.string()
});


export { id, rule, schema };
