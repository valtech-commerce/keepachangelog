//--------------------------------------------------------
//-- Formatters
//--------------------------------------------------------
import * as json      from './json';
import * as stylelish from './stylish';


module.exports = {

	[json.id]: {
		formatter: json.formatter
	},

	[stylelish.id]: {
		formatter: stylelish.formatter
	}

};
