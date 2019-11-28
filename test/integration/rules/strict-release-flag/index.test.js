//--------------------------------------------------------
//-- strict-release-flag rule - Integration tests
//--------------------------------------------------------
import ruleWithOptionsTests  from '../rule-with-options-tests';
import { id }                from '../../../../packages/lint/dist/node/rules/strict-release-flag';
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
	test(`Ensure no flag validates`, () => {
		given.stub('valid-no-flag');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure single valid flag validates`, () => {
		given.stub('valid-single');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure multiple valid flags validates`, () => {
		given.stub('valid-multiple');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure custom flag validates`, () => {
		given.stub('valid-custom');
		given.ruleIsEnabled();
		given.optionsWhitelist(['lorem', 'ipsum']);
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});


	//-- Invalid
	test(`Ensure empty flag does not validates`, () => {
		given.stub('invalid-empty');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure single wrong flag does not validates`, () => {
		given.stub('invalid-single');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure multiple wrong flags do not validate`, () => {
		given.stub('invalid-multiple');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(3);
	});

	test(`Ensure non-whitelisted custom flags do not validate`, () => {
		given.stub('valid-multiple');
		given.ruleIsEnabled();
		given.optionsWhitelist(['lorem', 'ipsum']);
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(2);
	});

});
