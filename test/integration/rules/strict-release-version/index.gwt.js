//--------------------------------------------------------
//-- strict-release-version rule - Given-When-Then
//--------------------------------------------------------
import * as gwt            from '../rules.gwt';
import * as ruleDefinition from '../../../../packages/lint/dist/node/rules/strict-release-version';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


given.currentRule = () => {
	given.rule(ruleDefinition);
};


//-- Scheme
given.optionsScheme = (scheme) => {
	given.options({ scheme });
};


export { given, when, then };
