//--------------------------------------------------------
//-- Keep a Changelog linter - getFormatter - Feature tests
//--------------------------------------------------------
import { given, when, then } from './get-formatter.gwt';


describe(`Validate getFormatter works`, () => {

	beforeEach(() => {
		given.noException();
		given.noReport();
		given.noFormatter();
		given.noOutput();
	});


	//-- Get formatter
	test(`Ensure fetching default formatter works`, async () => {
		await given.reportWithNoError();
		when.formatterIsFetched();
		then.shouldNotHaveThrown();
	});

	test(`Ensure fetching non-string formatter fails`, async () => {
		await given.reportWithNoError();
		when.formatterIsFetched(1);
		then.shouldHaveThrownMessageRequiringValidFormatter();
	});

	test(`Ensure fetching empty formatter fails`, async () => {
		await given.reportWithNoError();
		when.formatterIsFetched('');
		then.shouldHaveThrownMessageRequiringValidFormatter();
	});

	test(`Ensure fetching non-existent formatter fails`, async () => {
		await given.reportWithNoError();
		when.formatterIsFetched('xyz');
		then.shouldHaveThrownMessageRequiringValidFormatter();
	});


	//-- Stylish
	test(`Ensure fetching stylish formatter works`, async () => {
		await given.reportWithNoError();
		when.formatterIsFetched('stylish');
		then.shouldNotHaveThrown();
	});

	test(`Ensure stylish formatter works with no errors`, async () => {
		await given.reportWithNoError();
		given.formatter('stylish');
		when.formatterIsCalled();
		then.outputShouldMatchStylishFixture('no-error');
	});

	test(`Ensure stylish formatter works with one error`, async () => {
		await given.reportWithOneError();
		given.formatter('stylish');
		when.formatterIsCalled();
		then.outputShouldMatchStylishFixture('one-error');
	});

	test(`Ensure stylish formatter works with multiple errors`, async () => {
		await given.reportWithMultipleErrors();
		given.formatter('stylish');
		when.formatterIsCalled();
		then.outputShouldMatchStylishFixture('multiple-errors');
	});

	test(`Ensure default formatter is 'stylish'`, async () => {
		await given.reportWithMultipleErrors();
		given.formatter();
		when.formatterIsCalled();
		then.outputShouldMatchTheStylishOutput();
	});


	//-- JSON
	test(`Ensure JSON formatter works with no errors`, async () => {
		await given.reportWithNoError();
		given.formatter('json');
		when.formatterIsCalled();
		then.outputShouldMatchJSONFixture('no-error');
	});

	test(`Ensure JSON formatter works with one error`, async () => {
		await given.reportWithOneError();
		given.formatter('json');
		when.formatterIsCalled();
		then.outputShouldMatchJSONFixture('one-error');
	});

	test(`Ensure JSON formatter works with multiple errors`, async () => {
		await given.reportWithMultipleErrors();
		given.formatter('json');
		when.formatterIsCalled();
		then.outputShouldMatchJSONFixture('multiple-errors');
	});

});

