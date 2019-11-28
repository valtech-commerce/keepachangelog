//--------------------------------------------------------
//-- strict-release-flag rule - Given-When-Then
//--------------------------------------------------------
import * as gwt            from '../rules.gwt';
import * as ruleDefinition from '../../../../packages/lint/dist/node/rules/strict-release-flag';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


given.currentRule = () => {
	given.rule(ruleDefinition);
};


//-- Whitelist
given.optionsWhitelist = (whitelist) => {
	given.options({ whitelist });
};


export { given, when, then };
