//--------------------------------------------------------
//-- strict-spacing rule - Given-When-Then
//--------------------------------------------------------
import * as gwt            from '../rules.gwt';
import * as ruleDefinition from '../../../../packages/lint/dist/node/rules/strict-spacing';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


given.currentRule = () => {
	given.rule(ruleDefinition);
};


//-- Header
given.optionsHeader = (header) => {
	given.options({ header });
};


//-- Release
given.optionsRelease = (release) => {
	given.options({ release });
};


export { given, when, then };
