//--------------------------------------------------------
//-- strict-filename
//--------------------------------------------------------
import path    from 'path';
import { Joi } from '@absolunet/joi';
import error   from '../helpers/error';

const FILENAME = 'CHANGELOG.md';


//-- Id
const id = 'strict-filename';


//-- Rule
const rule = ({ filePath,	config: [enabled, { filename = FILENAME } = {}] }) => {
	if (enabled === true) {
		if (path.basename(filePath) !== filename) {
			return [error(id, `Filename must be {{filename}}`, { filename })];
		}
	}

	return [];
};


//-- Options schema
const schema = Joi.object({
	filename: Joi.string()
});


export { id, rule, schema };
