//--------------------------------------------------------
//-- Keep a Changelog linter - Instantiate - Feature tests
//--------------------------------------------------------
import { given, when, then } from './instantiate.gwt';


describe(`Validate it instantiates`, () => {

	beforeEach(() => {
		given.noException();
		given.noConfig();
	});


	//-- Valid
	test(`Ensure it works with no config`, () => {
		when.linterIsInstantiated();
		then.shouldNotHaveThrown();
	});

	test(`Ensure it works with empty config`, () => {
		given.config({});
		when.linterIsInstantiated();
		then.shouldNotHaveThrown();
	});

	test(`Ensure it works with a valid config with no options`, () => {
		given.config({ 'strict-filename': [true] });
		when.linterIsInstantiated();
		then.shouldNotHaveThrown();
	});

	test(`Ensure it works with a valid config with empty options`, () => {
		given.config({ 'strict-filename': [true, {}] });
		when.linterIsInstantiated();
		then.shouldNotHaveThrown();
	});

	test(`Ensure it works with a valid config with options`, () => {
		given.config({ 'strict-filename': [true, { filename: 'xyz.md' }] });
		when.linterIsInstantiated();
		then.shouldNotHaveThrown();
	});


	//-- Invalid
	test(`Ensure it fails with non-object config`, () => {
		given.config(true);
		when.linterIsInstantiated();
		then.shouldHaveThrownMessageContaining(`"config" must be of type object`);
	});

	test(`Ensure it fails with a non-existent rule`, () => {
		given.config({ xyz: [true] });
		when.linterIsInstantiated();
		then.shouldHaveThrownMessageContaining(`Rule 'xyz' does not exists.`);
	});

	test(`Ensure it fails with a non-array rule config`, () => {
		given.config({ 'strict-filename': {} });
		when.linterIsInstantiated();
		then.shouldHaveThrownMessageContaining(`"config.strict-filename" must be an array`);
	});

	test(`Ensure it fails with a non-boolean enable flag`, () => {
		given.config({ 'strict-filename': ['xyz'] });
		when.linterIsInstantiated();
		then.shouldHaveThrownMessageContaining(`"config.strict-filename[0]" must be a boolean`);
	});

	test(`Ensure it fails with options not respecting rule schema`, () => {
		given.config({ 'strict-filename': [true, { xyz: 0 }] });
		when.linterIsInstantiated();
		then.shouldHaveThrownMessageContaining(`Invalid options for 'strict-filename'`);
	});

});

