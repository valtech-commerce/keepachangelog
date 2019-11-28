//--------------------------------------------------------
//-- strict-header rule - Integration tests
//--------------------------------------------------------
import ruleWithOptionsTests  from '../rule-with-options-tests';
import { id }                from '../../../../packages/lint/dist/node/rules/strict-header';
import { given, when, then } from './index.gwt';


describe(`Validate that ${id} rule works`, () => {

	//-- Base
	ruleWithOptionsTests({ given, when, then });


	//-- Options
	test(`Ensure options validate`, () => {
		given.options({ header: '# Lorem' });
		when.optionsAreValidated();
		then.optionsShouldValidate();
	});

	test(`Ensure options other than header does not validate`, () => {
		given.options({ xyz: '# Lorem' });
		when.optionsAreValidated();
		then.optionsShouldNotAllow('xyz');
	});

	test(`Ensure options header that is not a string does not validate`, () => {
		given.options({ header: 5 });
		when.optionsAreValidated();
		then.optionsShouldRequireAStringFor('header');
	});


	//-- Valid
	test(`Ensure clean header validates`, () => {
		given.stub('valid');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure clean custom header validates`, () => {
		given.stub('valid-custom');
		given.ruleIsEnabled();
		given.optionsHeader('# Lorem\n> Ipsum');
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});


	//-- Invalid
	test(`Ensure different header does not validate`, () => {
		given.stub('invalid-different');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure too long header does not validate`, () => {
		given.stub('invalid-too-long');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure wrong custom header does not validate`, () => {
		given.stub('valid');
		given.ruleIsEnabled();
		given.optionsHeader('# Lorem\n> Ipsum');
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

});
