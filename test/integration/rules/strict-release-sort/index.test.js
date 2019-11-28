//--------------------------------------------------------
//-- strict-release-sort rule - Integration tests
//--------------------------------------------------------
import ruleWithOptionsTests  from '../rule-with-options-tests';
import { id }                from '../../../../packages/lint/dist/node/rules/strict-release-sort';
import { given, when, then } from './index.gwt';


describe(`Validate that ${id} rule works`, () => {

	//-- Base
	ruleWithOptionsTests({ given, when, then });


	//-- Options
	test(`Ensure options key validates`, () => {
		given.options({ key: 'date' });
		when.optionsAreValidated();
		then.optionsShouldValidate();
	});

	test(`Ensure options desc validates`, () => {
		given.options({ desc: false });
		when.optionsAreValidated();
		then.optionsShouldValidate();
	});

	test(`Ensure options key and desc validate`, () => {
		given.options({ key: 'version', desc: true });
		when.optionsAreValidated();
		then.optionsShouldValidate();
	});

	test(`Ensure options other than key/desc does not validate`, () => {
		given.options({ xyz: 'date' });
		when.optionsAreValidated();
		then.optionsShouldNotAllow('xyz');
	});

	test(`Ensure options key that is not a string does not validate`, () => {
		given.options({ key: 5 });
		when.optionsAreValidated();
		then.optionsShouldRequireSpecificValuesFor('key');
	});

	test(`Ensure options key that is not supported does not validate`, () => {
		given.options({ key: 'lorem' });
		when.optionsAreValidated();
		then.optionsShouldRequireSpecificValuesFor('key');
	});

	test(`Ensure options desc that is not a boolean does not validate`, () => {
		given.options({ desc: 5 });
		when.optionsAreValidated();
		then.optionsShouldRequireABooleanFor('desc');
	});



	//-- Valid
	test(`Ensure single release validates`, () => {
		given.stub('valid-single');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure order by descending dates validates`, () => {
		given.stub('valid-date-desc');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure order by ascending dates validates`, () => {
		given.stub('valid-date-asc');
		given.ruleIsEnabled();
		given.optionsAscending();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure order by descending versions validates`, () => {
		given.stub('valid-version-desc');
		given.ruleIsEnabled();
		given.optionsKey('version');
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure order by ascending versions validates`, () => {
		given.stub('valid-version-asc');
		given.ruleIsEnabled();
		given.optionsAscendingKey('version');
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});


	//-- Invalid
	test(`Ensure wrong order by descending dates does not validate`, () => {
		given.stub('valid-date-asc');
		given.ruleIsEnabled();
		given.optionsDescendingKey('date');
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure wrong order by ascending dates does not validate`, () => {
		given.stub('valid-version-asc');
		given.ruleIsEnabled();
		given.optionsAscendingKey('date');
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure wrong order by descending versions does not validate`, () => {
		given.stub('valid-version-asc');
		given.ruleIsEnabled();
		given.optionsDescendingKey('version');
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure wrong order by ascending versions does not validate`, () => {
		given.stub('valid-date-asc');
		given.ruleIsEnabled();
		given.optionsAscendingKey('version');
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

});
