//--------------------------------------------------------
//-- strict-filename rule - Given-When-Then
//--------------------------------------------------------
import * as gwt            from '../rules.gwt';
import * as ruleDefinition from '../../../../packages/lint/dist/node/rules/strict-filename';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


given.currentRule = () => {
	given.rule(ruleDefinition);
};


//-- Filename
given.optionsFilename = (filename) => {
	given.options({ filename });
};


export { given, when, then };
