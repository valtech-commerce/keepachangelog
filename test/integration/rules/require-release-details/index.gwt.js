//--------------------------------------------------------
//-- require-release-details rule - Given-When-Then
//--------------------------------------------------------
import * as gwt            from '../rules.gwt';
import * as ruleDefinition from '../../../../packages/lint/dist/node/rules/require-release-details';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


given.currentRule = () => {
	given.rule(ruleDefinition);
};


export { given, when, then };
