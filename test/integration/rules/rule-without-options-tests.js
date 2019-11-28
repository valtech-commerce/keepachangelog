//--------------------------------------------------------
//-- Rule without options tests
//--------------------------------------------------------
import ruleBaseTests from './rule-base-tests';


export default ({ given, when, then }) => {

	//-- Base
	ruleBaseTests({ given, when, then });


	//-- Defined options
	test(`Ensure defined options do not validate`, () => {
		given.optionsAreDefined();
		when.optionsAreValidated();
		then.optionsShouldNotAllow('value');
	});

};
