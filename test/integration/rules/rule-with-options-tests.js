//--------------------------------------------------------
//-- Rule with options tests
//--------------------------------------------------------
import ruleBaseTests from './rule-base-tests';


export default ({ given, when, then }) => {

	//-- Base
	ruleBaseTests({ given, when, then });


	//-- Defined options
	test(`Ensure defined options validate`, () => {
		given.optionsAreDefined();
		when.optionsAreValidated();
		then.optionsShouldValidate();
	});

};
