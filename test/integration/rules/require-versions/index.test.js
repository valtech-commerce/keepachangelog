//--------------------------------------------------------
//-- require-versions rule - Integration tests
//--------------------------------------------------------
import ruleWithOptionsTests  from '../rule-with-options-tests';
import { id }                from '../../../../packages/lint/dist/node/rules/require-versions';
import { given, when, then } from './index.gwt';


describe(`Validate that ${id} rule works`, () => {

	//-- Base
	ruleWithOptionsTests({ given, when, then });


	//-- Options
	test(`Ensure options validate`, () => {
		given.options({ versions: ['1.0.0', '2.0.0'] });
		when.optionsAreValidated();
		then.optionsShouldValidate();
	});

	test(`Ensure options other than versions does not validate`, () => {
		given.options({ xyz: ['1.0.0', '2.0.0'] });
		when.optionsAreValidated();
		then.optionsShouldNotAllow('xyz');
	});

	test(`Ensure options versions that is not an array does not validate`, () => {
		given.options({ versions: 5 });
		when.optionsAreValidated();
		then.optionsShouldRequireAnArrayFor('versions');
	});

	test(`Ensure options versions items that are not a string does not validate`, () => {
		given.options({ versions: [5] });
		when.optionsAreValidated();
		then.optionsShouldRequireAStringFor('versions[0]');
	});


	//-- Valid
	test(`Ensure no version validates`, () => {
		given.stub('versions');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure single present version validates`, () => {
		given.stub('versions');
		given.ruleIsEnabled();
		given.optionsVersions(['1.0.0']);
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure multiple present versions validates`, () => {
		given.stub('versions');
		given.ruleIsEnabled();
		given.optionsVersions(['1.0.0', 'beta']);
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});


	//-- Invalid
	test(`Ensure a single absent version does not validate`, () => {
		given.stub('versions');
		given.ruleIsEnabled();
		given.optionsVersions(['2.0.0']);
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure multiple absent versions do not validate`, () => {
		given.stub('versions');
		given.ruleIsEnabled();
		given.optionsVersions(['2.0.0', 'rc']);
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(2);
	});

	test(`Ensure mixed present and absent versions do not validate`, () => {
		given.stub('versions');
		given.ruleIsEnabled();
		given.optionsVersions(['1.0.0', 'rc']);
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

});
