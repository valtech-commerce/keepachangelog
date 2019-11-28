//--------------------------------------------------------
//-- strict-changes-types rule - Integration tests
//--------------------------------------------------------
import ruleWithOptionsTests  from '../rule-with-options-tests';
import { id }                from '../../../../packages/lint/dist/node/rules/strict-changes-types';
import { given, when, then } from './index.gwt';


describe(`Validate that ${id} rule works`, () => {

	//-- Base
	ruleWithOptionsTests({ given, when, then });


	//-- Options
	test(`Ensure options validate`, () => {
		given.options({ whitelist: ['lorem', 'ipsum'] });
		when.optionsAreValidated();
		then.optionsShouldValidate();
	});

	test(`Ensure options other than whitelist does not validate`, () => {
		given.options({ xyz: ['lorem', 'ipsum'] });
		when.optionsAreValidated();
		then.optionsShouldNotAllow('xyz');
	});

	test(`Ensure options whitelist that is not an array does not validate`, () => {
		given.options({ whitelist: 5 });
		when.optionsAreValidated();
		then.optionsShouldRequireAnArrayFor('whitelist');
	});

	test(`Ensure options whitelist items that are not a string does not validate`, () => {
		given.options({ whitelist: [5] });
		when.optionsAreValidated();
		then.optionsShouldRequireAStringFor('whitelist[0]');
	});


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

	test(`Ensure custom change type validates`, () => {
		given.stub('valid-custom-changes');
		given.ruleIsEnabled();
		given.optionsWhitelist(['lorem', 'ipsum']);
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});


	//-- Invalid
	test(`Ensure non-whitelisted change type does not validate`, () => {
		given.stub('invalid-single-change');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure multiple non-whitelisted changes types do not validate`, () => {
		given.stub('invalid-multiple-changes');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(2);
	});

	test(`Ensure non-whitelisted custom changes types do not validate`, () => {
		given.stub('valid-multiple-changes');
		given.ruleIsEnabled();
		given.optionsWhitelist(['lorem', 'ipsum']);
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(2);
	});

});
