//--------------------------------------------------------
//-- Rule base tests
//--------------------------------------------------------
export default ({ given, when, then }) => {

	beforeEach(() => {
		given.noException();
		given.noRule();
		given.noData();
		given.noConfig();
		given.noErrors();
		given.currentRule();
	});


	//-- Disabled
	test(`Ensure rule isn't validated if not enabled`, () => {
		given.ruleIsDisabled();
		when.ruleIsExecuted();
		then.ruleShouldReturnNoError();
	});


	//-- Options
	test(`Ensure no options validates`, () => {
		given.noOptions();
		when.optionsAreValidated();
		then.optionsShouldValidate();
	});

};
