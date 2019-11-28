//--------------------------------------------------------
//-- strict-release-date rule - Integration tests
//--------------------------------------------------------
import ruleWithOptionsTests  from '../rule-with-options-tests';
import { id }                from '../../../../packages/lint/dist/node/rules/strict-release-date';
import { given, when, then } from './index.gwt';


describe(`Validate that ${id} rule works`, () => {

	//-- Base
	ruleWithOptionsTests({ given, when, then });


	//-- Options
	test(`Ensure options validate`, () => {
		given.options({ format: 'YYYY/MM/DD' });
		when.optionsAreValidated();
		then.optionsShouldValidate();
	});

	test(`Ensure options other than format does not validate`, () => {
		given.options({ xyz: 'YYYY/MM/DD' });
		when.optionsAreValidated();
		then.optionsShouldNotAllow('xyz');
	});

	test(`Ensure options format that is not a string does not validate`, () => {
		given.options({ format: 5 });
		when.optionsAreValidated();
		then.optionsShouldRequireAStringFor('format');
	});

	test(`Ensure options format that is empty does not validate`, () => {
		given.options({ format: '' });
		when.optionsAreValidated();
		then.optionsShouldRequireValueFor('format');
	});


	//-- Valid
	test(`Ensure single valid date validates`, () => {
		given.stub('valid-single');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure multiple valid dates validates`, () => {
		given.stub('valid-multiple');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure custom format date validates`, () => {
		given.stub('valid-custom');
		given.ruleIsEnabled();
		given.optionsFormat('YYYY/MM/DD');
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});


	//-- Invalid
	test(`Ensure no date does not validates`, () => {
		given.stub('invalid-no-date');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure an impossible date does not validate`, () => {
		given.stub('invalid-impossible-date');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure a bad format does not validate`, () => {
		given.stub('valid-custom');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure multiple wrong dates do not validate`, () => {
		given.stub('invalid-multiple');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(3);
	});

	test(`Ensure custom format with wrong date does not validate`, () => {
		given.stub('valid-single');
		given.ruleIsEnabled();
		given.optionsFormat('YYYY/MM/DD');
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

});
