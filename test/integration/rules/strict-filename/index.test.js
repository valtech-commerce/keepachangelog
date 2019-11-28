//--------------------------------------------------------
//-- strict-filename rule - Integration tests
//--------------------------------------------------------
import ruleWithOptionsTests  from '../rule-with-options-tests';
import { id }                from '../../../../packages/lint/dist/node/rules/strict-filename';
import { given, when, then } from './index.gwt';


describe(`Validate that ${id} rule works`, () => {

	//-- Base
	ruleWithOptionsTests({ given, when, then });


	//-- Options
	test(`Ensure options validate`, () => {
		given.options({ filename: 'log.md' });
		when.optionsAreValidated();
		then.optionsShouldValidate();
	});

	test(`Ensure options other than filename does not validate`, () => {
		given.options({ xyz: 'log.md' });
		when.optionsAreValidated();
		then.optionsShouldNotAllow('xyz');
	});

	test(`Ensure options filename that is not a string does not validate`, () => {
		given.options({ filename: 5 });
		when.optionsAreValidated();
		then.optionsShouldRequireAStringFor('filename');
	});


	//-- Valid
	test(`Ensure clean filename validates`, () => {
		given.filePath('CHANGELOG.md');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});

	test(`Ensure custom filename validates`, () => {
		given.filePath('loremipsum.txt');
		given.ruleIsEnabled();
		given.optionsFilename('loremipsum.txt');
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});


	//-- Invalid
	test(`Ensure filename without extension does not validate`, () => {
		given.filePath('CHANGELOG');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure lowercase filename does not validate`, () => {
		given.filePath('changelog.md');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure random filename does not validate`, () => {
		given.filePath('HELLO.md');
		given.ruleIsEnabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

	test(`Ensure wrong custom filename does not validate`, () => {
		given.filePath('CHANGELOG.md');
		given.ruleIsEnabled();
		given.optionsFilename('loremipsum.txt');
		when.ruleIsExecuted();
		then.ruleShouldReturnAnErrorCountOf(1);
	});

});
