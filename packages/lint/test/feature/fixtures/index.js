import * as jsonMultipleErrors from './json/multiple-errors';
import * as jsonNoError        from './json/no-error';
import * as jsonOneError       from './json/one-error';

import * as stylishMultipleErrors from './stylish/multiple-errors';
import * as stylishNoError        from './stylish/no-error';
import * as stylishOneError       from './stylish/one-error';


export default {
	json: {
		'multiple-errors': jsonMultipleErrors.default,
		'no-error':        jsonNoError.default,
		'one-error':       jsonOneError.default
	},
	stylish: {
		'multiple-errors': stylishMultipleErrors.default,
		'no-error':        stylishNoError.default,
		'one-error':       stylishOneError.default
	}
};
