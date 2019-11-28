//--------------------------------------------------------
//-- Formatter - JSON
//--------------------------------------------------------
export const id = 'json';

export const formatter = (report) => {
	return JSON.stringify(report);
};
