//--------------------------------------------------------
//-- require-release-details rule - Integration tests
//--------------------------------------------------------
import ruleWithoutOptionsTests from '../rule-without-options-tests';
import { id }                  from '../../../../packages/lint/dist/node/rules/require-release-details';
import { given, when, then }   from './index.gwt';


describe(`Validate that ${id} rule works`, () => {

	//-- Base
	ruleWithoutOptionsTests({ given, when, then });


	//-- Valid
	test(`Ensure single release details validates`, () => {
		given.stub('valid-single');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure multiple releases details validate`, () => {
		given.stub('valid-multiple');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});


	//-- Invalid
	test(`Ensure single empty release details does not validate`, () => {
		given.stub('invalid-single');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure multiple empty release details do not validate`, () => {
		given.stub('invalid-multiple');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(2);
	});

});
