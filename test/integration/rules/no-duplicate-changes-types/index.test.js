//--------------------------------------------------------
//-- no-duplicate-changes-types rule - Integration tests
//--------------------------------------------------------
import ruleWithoutOptionsTests from '../rule-without-options-tests';
import { id }                  from '../../../../packages/lint/dist/node/rules/no-duplicate-changes-types';
import { given, when, then }   from './index.gwt';


describe(`Validate that ${id} rule works`, () => {

	//-- Base
	ruleWithoutOptionsTests({ given, when, then });


	//-- Valid
	test(`Ensure single change type validates`, () => {
		given.stub('valid-single-change');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure multiple changes types validates`, () => {
		given.stub('valid-multiple-changes');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure multiple releases validates`, () => {
		given.stub('valid-multiple-releases');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});


	//-- Invalid
	test(`Ensure duplicated changes types in a single release do not validate`, () => {
		given.stub('invalid-multiple-changes');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure duplicated changes types in a multiple releases do not validate`, () => {
		given.stub('invalid-multiple-releases');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(3);
	});

});
