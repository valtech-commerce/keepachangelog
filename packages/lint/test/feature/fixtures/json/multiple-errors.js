export default {
	filePath: expect.toBeString(),
	results: [
		{
			rule: 'require-header',
			data: {},
			message: {
				template: 'Changelog must begin with a header',
				plain:    'Changelog must begin with a header'
			}
		},
		{
			rule: 'strict-filename',
			data: {
				filename: 'CHANGELOG.md'
			},
			message: {
				template: 'Filename must be {{filename}}',
				plain:    `Filename must be 'CHANGELOG.md'`
			}
		},
		{
			rule: 'strict-header',
			data: {},
			message: {
				template: 'Changelog must begin with the standardized header',
				plain:    'Changelog must begin with the standardized header'
			}
		}
	]
};
