//--------------------------------------------------------
//-- require-versions rule - Given-When-Then
//--------------------------------------------------------
import * as gwt            from '../rules.gwt';
import * as ruleDefinition from '../../../../packages/lint/dist/node/rules/require-versions';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


given.currentRule = () => {
	given.rule(ruleDefinition);
};


//-- Versions
given.optionsVersions = (versions) => {
	given.options({ versions });
};


export { given, when, then };
