//--------------------------------------------------------
//-- require-release-link rule - Integration tests
//--------------------------------------------------------
import ruleWithoutOptionsTests from '../rule-without-options-tests';
import { id }                  from '../../../../packages/lint/dist/node/rules/require-release-link';
import { given, when, then }   from './index.gwt';


describe(`Validate that ${id} rule works`, () => {

	//-- Base
	ruleWithoutOptionsTests({ given, when, then });


	//-- Valid
	test(`Ensure multiple links validates`, () => {
		given.stub('valid');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});


	//-- Invalid
	test(`Ensure a unlinked version does not validate`, () => {
		given.stub('invalid-no-link');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure a linked version without a link definition does not validate`, () => {
		given.stub('invalid-no-link-definition');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure multiple versions without a link or link definition do not validate`, () => {
		given.stub('invalid-multiple');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(2);
	});

});
