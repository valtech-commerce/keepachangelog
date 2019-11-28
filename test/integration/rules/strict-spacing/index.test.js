//--------------------------------------------------------
//-- strict-spacing rule - Integration tests
//--------------------------------------------------------
import ruleWithOptionsTests  from '../rule-with-options-tests';
import { id }                from '../../../../packages/lint/dist/node/rules/strict-spacing';
import { given, when, then } from './index.gwt';


describe(`Validate that ${id} rule works`, () => {

	//-- Base
	ruleWithOptionsTests({ given, when, then });


	//-- Options
	test(`Ensure options header validates`, () => {
		given.options({ header: 5 });
		when.optionsAreValidated();
		then.optionsShouldValidate();
	});

	test(`Ensure options release validates`, () => {
		given.options({ release: 5 });
		when.optionsAreValidated();
		then.optionsShouldValidate();
	});

	test(`Ensure options header and release validate`, () => {
		given.options({ header: 7, release: 7 });
		when.optionsAreValidated();
		then.optionsShouldValidate();
	});

	test(`Ensure options other than header/release does not validate`, () => {
		given.options({ xyz: 7 });
		when.optionsAreValidated();
		then.optionsShouldNotAllow('xyz');
	});

	test(`Ensure options header that is not a number does not validate`, () => {
		given.options({ header: 'xyz' });
		when.optionsAreValidated();
		then.optionsShouldRequireANumberFor('header');
	});

	test(`Ensure options header that is not an integer does not validate`, () => {
		given.options({ header: 5.55 });
		when.optionsAreValidated();
		then.optionsShouldRequireAnIntegerFor('header');
	});

	test(`Ensure options header that is not positive does not validate`, () => {
		given.options({ header: -5 });
		when.optionsAreValidated();
		then.optionsShouldRequireAPositiveFor('header');
	});

	test(`Ensure options release that is not a number does not validate`, () => {
		given.options({ release: 'xyz' });
		when.optionsAreValidated();
		then.optionsShouldRequireANumberFor('release');
	});

	test(`Ensure options release that is not an integer does not validate`, () => {
		given.options({ release: 5.55 });
		when.optionsAreValidated();
		then.optionsShouldRequireAnIntegerFor('release');
	});

	test(`Ensure options release that is not positive does not validate`, () => {
		given.options({ release: -5 });
		when.optionsAreValidated();
		then.optionsShouldRequireAPositiveFor('release');
	});


	//-- Valid
	test(`Ensure header validates`, () => {
		given.stub('valid-header');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure no header validates`, () => {
		given.stub('valid-header-absent');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure custom header validates`, () => {
		given.stub('valid-header-custom');
		given.ruleIsEnabled();
		given.optionsHeader(4);
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure single release validates`, () => {
		given.stub('valid-release-single');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure empty release validates`, () => {
		given.stub('valid-release-empty');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure unreleased validates`, () => {
		given.stub('valid-unreleased');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure multiple releases validate`, () => {
		given.stub('valid-release-multiple');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure custom release validates`, () => {
		given.stub('valid-release-custom');
		given.ruleIsEnabled();
		given.optionsRelease(2);
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});



	//-- Invalid
	test(`Ensure not enough spacing header does not validate`, () => {
		given.stub('invalid-header-less');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure too much spacing header does not validate`, () => {
		given.stub('invalid-header-more');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure wrong custom header does not validate`, () => {
		given.stub('valid-header');
		given.ruleIsEnabled();
		given.optionsHeader(2);
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure not enough spacing release does not validate`, () => {
		given.stub('invalid-release-less');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure too much spacing release does not validate`, () => {
		given.stub('invalid-release-more');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure not enough spacing empty release does not validate`, () => {
		given.stub('invalid-release-empty-less');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure too much spacing empty release does not validate`, () => {
		given.stub('invalid-release-empty-more');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure wrong custom release does not validate`, () => {
		given.stub('valid-release-single');
		given.ruleIsEnabled();
		given.optionsRelease(5);
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

});
