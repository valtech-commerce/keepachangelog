//--------------------------------------------------------
//-- Base - Given-When-Then
//--------------------------------------------------------
const given = {};
const when  = {};
const then  = {};

let exception;


//-- Given - Reset
given.noException = () => {
	exception = undefined;
};


//-- When - Attemping
when.attempting = (closure) => {
	try {
		closure();
	} catch (error) {
		exception = error;
	}
};

when.attemptingAsync = async (closure) => {
	try {
		await closure();
	} catch (error) {
		exception = error;
	}
};


//-- Then -- Thrown
then.shouldHaveThrown = () => {
	expect(exception).toBeTruthy();
};

then.shouldHaveThrownMessageContaining = (message) => {
	expect(exception.message).toContain(message);
};

then.shouldNotHaveThrown = () => {
	expect((exception || {}).stack).toBeFalsy();
};


export { given, when, then };
