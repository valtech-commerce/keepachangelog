//--------------------------------------------------------
//-- strict-release-sort rule - Given-When-Then
//--------------------------------------------------------
import * as gwt            from '../rules.gwt';
import * as ruleDefinition from '../../../../packages/lint/dist/node/rules/strict-release-sort';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


given.currentRule = () => {
	given.rule(ruleDefinition);
};


//-- Order
given.optionsAscending = () => {
	given.options({ desc: false });
};

given.optionsDescending = () => {
	given.options({ desc: true });
};


//-- Key
given.optionsKey = (key) => {
	given.options({ key });
};


//-- Key & Order
given.optionsAscendingKey = (key) => {
	given.options({ key, desc: false });
};

given.optionsDescendingKey = (key) => {
	given.options({ key, desc: true });
};


export { given, when, then };
