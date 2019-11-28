//--------------------------------------------------------
//-- Keep a Changelog linter - executeOnFile - Given-When-Then
//--------------------------------------------------------
import { Linter } from '../../dist/node';
import * as gwt   from '../../../../test/base.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let linter;
let stub;
let report;


//-- Given - Reset
given.noInstance = () => {
	linter = undefined;
};

given.noStub = () => {
	stub = undefined;
};

given.noReport = () => {
	report = undefined;
};


//-- Given
given.linterIsInstantiatedWithConfig = (config) => {
	linter = new Linter(config);
};

given.stub = (value) => {
	stub = `${__dirname}/stubs/${value}.md`;
};


//-- When
when.fileIsLinted = async () => {
	await when.attemptingAsync(async () => {
		report = await linter.executeOnFile(stub);
	});
};


//-- Then
then.reportShouldReturnAnErrorCountOf = (count) => {
	then.shouldNotHaveThrown();
	expect(report.results).toBeArrayOfSize(count);
};

then.reportShouldReturnNoError = () => {
	then.reportShouldReturnAnErrorCountOf(0);
};

then.reportShouldReturnAnErrorForRule = (rule) => {
	then.reportShouldReturnAnErrorCountOf(1);
	expect(report.results[0].rule).toBe(rule);
};

then.reportShouldReturnAnErrorForRules = (rules) => {
	then.reportShouldReturnAnErrorCountOf(rules.length);

	const erroredRules = report.results.map(({ rule }) => { return rule; });
	expect(erroredRules).toIncludeAllMembers(rules);
};


export { given, when, then };
