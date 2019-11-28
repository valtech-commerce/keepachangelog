//--------------------------------------------------------
//-- Keep a Changelog linter - executeOnFile - Feature tests
//--------------------------------------------------------
import { given, when, then } from './execute-on-file.gwt';


describe(`Validate executeOnFile works`, () => {

	beforeEach(() => {
		given.noException();
		given.noInstance();
		given.noStub();
		given.noReport();
	});


	//-- Valid
	test(`Ensure it works`, async () => {
		given.linterIsInstantiatedWithConfig();
		given.stub('CHANGELOG');
		await when.fileIsLinted();
		then.reportShouldReturnNoError();
	});

	test(`Ensure it works with custom disabled rule`, async () => {
		given.linterIsInstantiatedWithConfig({
			'strict-filename': [false]
		});
		given.stub('custom-filename');
		await when.fileIsLinted();
		then.reportShouldReturnNoError();
	});

	test(`Ensure it works with custom rule with config`, async () => {
		given.linterIsInstantiatedWithConfig({
			'strict-filename': [true, { filename: 'custom-filename.md' }]
		});
		given.stub('custom-filename');
		await when.fileIsLinted();
		then.reportShouldReturnNoError();
	});

	test(`Ensure it works with multiple custom rules`, async () => {
		given.linterIsInstantiatedWithConfig({
			'strict-filename': [true, { filename: 'no-header.md' }],
			'require-header':  [false],
			'strict-header':   [false]
		});
		given.stub('no-header');
		await when.fileIsLinted();
		then.reportShouldReturnNoError();
	});


	//-- Invalid
	test(`Ensure it fails with no file`, async () => {
		given.linterIsInstantiatedWithConfig();
		await when.fileIsLinted();
		then.shouldHaveThrownMessageContaining(`"file" is required`);
	});

	test(`Ensure it fails with a non-existent file`, async () => {
		given.linterIsInstantiatedWithConfig();
		given.stub('xyz');
		await when.fileIsLinted();
		then.shouldHaveThrownMessageContaining(`ENOENT: no such file or directory`);
	});

	test(`Ensure it fails on invalid file with no parameters`, async () => {
		given.linterIsInstantiatedWithConfig();
		given.stub('custom-filename');
		await when.fileIsLinted();
		then.reportShouldReturnAnErrorForRule('strict-filename');
	});

	test(`Ensure it fails on valid file with a custom rule`, async () => {
		given.linterIsInstantiatedWithConfig({
			'strict-filename': [true, { filename: 'custom-filename.md' }]
		});
		given.stub('CHANGELOG');
		await when.fileIsLinted();
		then.reportShouldReturnAnErrorForRule('strict-filename');
	});

	test(`Ensure it fails once on invalid file with multiple custom rules`, async () => {
		given.linterIsInstantiatedWithConfig({
			'strict-filename': [true, { filename: 'no-header.md' }],
			'strict-header':   [false]
		});
		given.stub('no-header');
		await when.fileIsLinted();
		then.reportShouldReturnAnErrorForRule('require-header');
	});

	test(`Ensure it fails multiple times on invalid file`, async () => {
		given.linterIsInstantiatedWithConfig();
		given.stub('no-header');
		await when.fileIsLinted();
		then.reportShouldReturnAnErrorForRules(['require-header', 'strict-filename', 'strict-header']);
	});

});

