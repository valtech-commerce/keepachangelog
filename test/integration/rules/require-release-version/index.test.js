//--------------------------------------------------------
//-- require-release-version rule - Integration tests
//--------------------------------------------------------
import ruleWithoutOptionsTests from '../rule-without-options-tests';
import { id }                  from '../../../../packages/lint/dist/node/rules/require-release-version';
import { given, when, then }   from './index.gwt';


describe(`Validate that ${id} rule works`, () => {

	//-- Base
	ruleWithoutOptionsTests({ given, when, then });


	//-- Valid
	test(`Ensure multiple versions validates`, () => {
		given.stub('valid');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});


	//-- Invalid
	test(`Ensure a single release without a version does not validate`, () => {
		given.stub('invalid-single');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure multiple releases without a version do not validate`, () => {
		given.stub('invalid-multiple');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(2);
	});

});
