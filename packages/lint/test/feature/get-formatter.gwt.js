//--------------------------------------------------------
//-- Keep a Changelog linter - getFormatter - Given-When-Then
//--------------------------------------------------------
import fixtures   from './fixtures';
import { Linter } from '../../dist/node';
import * as gwt   from '../../../../test/base.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let linter;
let report;
let formatter;
let output;


//-- Given - Reset
given.noReport = () => {
	linter = undefined;
	report = undefined;
};

given.noFormatter = () => {
	formatter = undefined;
};

given.noOutput = () => {
	output = undefined;
};


//-- Given - Report
given.stubIsLinted = async (stub) => {
	linter = new Linter();
	report = await linter.executeOnFile(`${__dirname}/stubs/${stub}.md`);
};

given.reportWithNoError = async () => {
	await given.stubIsLinted('CHANGELOG');
};

given.reportWithOneError = async () => {
	await given.stubIsLinted('custom-filename');
};

given.reportWithMultipleErrors = async () => {
	await given.stubIsLinted('no-header');
};


//-- Given
given.formatter = (value) => {
	formatter = linter.getFormatter(value);
};



//-- When
when.formatterIsFetched = (value) => {
	when.attempting(() => {
		linter.getFormatter(value);
	});
};

when.formatterIsCalled = () => {
	output = formatter(report);
};


//-- Then
then.shouldHaveThrownMessageRequiringValidFormatter = () => {
	then.shouldHaveThrownMessageContaining('"formatter" must be one of [');
};

then.outputShouldMatchStylishFixture = (fixture) => {
	expect(output).toEndWith(fixtures.stylish[fixture]);
};

then.outputShouldMatchTheStylishOutput = () => {
	expect(output).toBe(linter.getFormatter('stylish')(report));
};

then.outputShouldMatchJSONFixture = (fixture) => {
	expect(JSON.parse(output)).toMatchObject(fixtures.json[fixture]);
};


export { given, when, then };
