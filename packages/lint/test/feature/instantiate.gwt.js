//--------------------------------------------------------
//-- Keep a Changelog linter - Instantiate - Given-When-Then
//--------------------------------------------------------
import { Linter } from '../../dist/node';
import * as gwt   from '../../../../test/base.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let config;


//-- Given - Reset
given.noConfig = () => {
	config = undefined;
};


//-- Given
given.config = (value) => {
	config = value;
};


//-- When
when.linterIsInstantiated = () => {
	when.attempting(() => {
		new Linter(config);  // eslint-disable-line no-new
	});
};


export { given, when, then };
