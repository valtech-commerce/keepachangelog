//--------------------------------------------------------
//-- strict-release-date rule - Given-When-Then
//--------------------------------------------------------
import * as gwt            from '../rules.gwt';
import * as ruleDefinition from '../../../../packages/lint/dist/node/rules/strict-release-date';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


given.currentRule = () => {
	given.rule(ruleDefinition);
};


//-- Format
given.optionsFormat = (format) => {
	given.options({ format });
};


export { given, when, then };
