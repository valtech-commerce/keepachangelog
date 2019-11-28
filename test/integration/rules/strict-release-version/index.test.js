//--------------------------------------------------------
//-- strict-release-version rule - Integration tests
//--------------------------------------------------------
import ruleWithOptionsTests  from '../rule-with-options-tests';
import { id }                from '../../../../packages/lint/dist/node/rules/strict-release-version';
import { given, when, then } from './index.gwt';


describe(`Validate that ${id} rule works`, () => {

	//-- Base
	ruleWithOptionsTests({ given, when, then });


	//-- Options
	test(`Ensure options validate`, () => {
		given.options({ scheme: 'semver' });
		when.optionsAreValidated();
		then.optionsShouldValidate();
	});

	test(`Ensure options other than scheme does not validate`, () => {
		given.options({ xyz: 'semver' });
		when.optionsAreValidated();
		then.optionsShouldNotAllow('xyz');
	});

	test(`Ensure options scheme that is not a string does not validate`, () => {
		given.options({ scheme: 5 });
		when.optionsAreValidated();
		then.optionsShouldRequireSpecificValuesFor('scheme');
	});

	test(`Ensure options scheme that is not supported does not validate`, () => {
		given.options({ scheme: 'lorem' });
		when.optionsAreValidated();
		then.optionsShouldRequireSpecificValuesFor('scheme');
	});


	//-- Valid
	test(`Ensure single valid version validates`, () => {
		given.stub('valid-single');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure multiple valid versions validates`, () => {
		given.stub('valid-multiple');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});


	//-- Invalid
	test(`Ensure no version does not validates`, () => {
		given.stub('invalid-no-version');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure a single wrong version does not validate`, () => {
		given.stub('invalid-single');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure multiple wrong versions do not validate`, () => {
		given.stub('invalid-multiple');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(2);
	});

});
