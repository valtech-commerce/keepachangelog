//--------------------------------------------------------
//-- Linter error helper
//--------------------------------------------------------
const processTemplate = (template, data, valueProcessor) => {
	return Object.entries(data).reduce((message, [key, value]) => {
		return message.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'u'), valueProcessor(value));
	}, template);
};


export default (id, template, data = {}) => {
	return {
		rule: id,
		data,
		message: {
			template,
			plain: processTemplate(template, data, (value) => { return `'${value}'`; })
		}
	};
};
