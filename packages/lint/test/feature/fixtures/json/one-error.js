export default {
	filePath: expect.toBeString(),
	results: [
		{
			rule: 'strict-filename',
			data: {
				filename: 'CHANGELOG.md'
			},
			message: {
				template: 'Filename must be {{filename}}',
				plain: `Filename must be 'CHANGELOG.md'`
			}
		}
	]
};
