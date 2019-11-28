//--------------------------------------------------------
//-- Rules - Given-When-Then
//--------------------------------------------------------
import { parser } from '../../../packages/parser/dist/node';
import * as gwt   from '../../base.gwt';

const given = { ...gwt.given };
const when  = { ...gwt.when };
const then  = { ...gwt.then };


let id;
let rule;
let schema;
let data;
let filePath;
let enabled;
let options;
let ruleErrors;
let optionsErrors;


//-- Given - Reset
given.noRule = () => {
	id     = undefined;
	rule   = undefined;
	schema = undefined;
};

given.noData = () => {
	data     = undefined;
	filePath = undefined;
};

given.noConfig = () => {
	enabled = undefined;
	options = undefined;
};

given.noErrors = () => {
	ruleErrors    = undefined;
	optionsErrors = undefined;
};


//-- Given - Rule
given.rule = (ruleDefinition) => {
	({ id, rule, schema } = ruleDefinition);
};


//-- Given - Stubs
given.stub = (stub) => {
	({ data } = parser.parseFile(`${__dirname}/../rules/${id}/stubs/${stub}.md`));
};


//-- Given - File path
given.filePath = (value) => {
	filePath = value;
};


//-- Given - Rule enabling
given.ruleIsEnabled = () => {
	enabled = true;
};

given.ruleIsDisabled = () => {
	enabled = false;
};


//-- Given - Options
given.options = (value) => {
	options = value;
};

given.noOptions = () => {
	given.options();
};

given.optionsAreDefined = () => {
	given.options({});
};




//-- When - Rule
when.ruleIsExecuted = () => {
	ruleErrors = rule({ data, filePath, config: [enabled, options] });
};


//-- When - Options
when.optionsAreValidated = () => {
	({ error: optionsErrors } = schema.validate(options));
};




//-- Then - Rule
then.ruleShouldReturnAnErrorCountOf = (count) => {
	expect(ruleErrors).toBeArrayOfSize(count);
	expect(ruleErrors).toSatisfyAll(({ rule: ruleId }) => {
		return ruleId === id;
	});
};

then.ruleShouldReturnNoError = () => {
	then.ruleShouldReturnAnErrorCountOf(0);
};


//-- Then - Options
then.optionsShouldValidate = () => {
	expect(optionsErrors).toBeUndefined();
};

then.optionsShouldNotValidate = () => {
	expect(optionsErrors.details).toBeArrayOfSize(1);
};

then.optionsShouldNotValidateBecause = (message) => {
	then.optionsShouldNotValidate();
	expect(optionsErrors.details[0].message).toContain(message);
};

then.optionsShouldNotValidateMatching = (pattern) => {
	then.optionsShouldNotValidate();
	expect(optionsErrors.details[0].message).toMatch(pattern);
};

then.optionsShouldNotAllow = (field) => {
	then.optionsShouldNotValidateBecause(`"${field}" is not allowed`);
};

then.optionsShouldRequireValueFor = (field) => {
	then.optionsShouldNotValidateBecause(`"${field}" is not allowed to be empty`);
};

then.optionsShouldRequireSpecificValuesFor = (field) => {
	then.optionsShouldNotValidateMatching(new RegExp(`"${field}" must be(?<multi> one of)? \\[.+\\]`, 'u'));
};

then.optionsShouldRequireAnArrayFor = (field) => {
	then.optionsShouldNotValidateBecause(`"${field}" must be an array`);
};

then.optionsShouldRequireABooleanFor = (field) => {
	then.optionsShouldNotValidateBecause(`"${field}" must be a boolean`);
};

then.optionsShouldRequireAnIntegerFor = (field) => {
	then.optionsShouldNotValidateBecause(`"${field}" must be an integer`);
};

then.optionsShouldRequireANumberFor = (field) => {
	then.optionsShouldNotValidateBecause(`"${field}" must be a number`);
};

then.optionsShouldRequireAPositiveFor = (field) => {
	then.optionsShouldNotValidateBecause(`"${field}" must be a positive number`);
};

then.optionsShouldRequireAStringFor = (field) => {
	then.optionsShouldNotValidateBecause(`"${field}" must be a string`);
};


export { given, when, then };
