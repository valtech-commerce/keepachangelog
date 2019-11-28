//--------------------------------------------------------
//-- require-header rule - Integration tests
//--------------------------------------------------------
import ruleWithoutOptionsTests from '../rule-without-options-tests';
import { id }                  from '../../../../packages/lint/dist/node/rules/require-header';
import { given, when, then }   from './index.gwt';


describe(`Validate that ${id} rule works`, () => {

	//-- Base
	ruleWithoutOptionsTests({ given, when, then });


	//-- Valid
	test(`Ensure present header validates`, () => {
		given.stub('valid');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});


	//-- Invalid
	test(`Ensure absent header does not validate`, () => {
		given.stub('invalid-absent');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure whitespace only does not validate`, () => {
		given.stub('invalid-whitespace-only');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

});
