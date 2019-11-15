//--------------------------------------------------------
//-- Manager
//--------------------------------------------------------
'use strict';

const { manager } = require('@absolunet/manager');

manager.init({
	repositoryType: 'multi-package',
	dist: {
		node: true
	}
});
