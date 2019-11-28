//--------------------------------------------------------
//-- Formatter - Stylish
//--------------------------------------------------------
import chalk     from 'chalk';
import figures   from 'figures';
import pluralize from 'pluralize';
import stripAnsi from 'strip-ansi';
import textTable from 'text-table';


export const id = 'stylish';

export const formatter = ({ filePath, results }) => {
	const count = results.length;

	if (count > 0) {
		let output = `\n${chalk.underline(filePath)}\n`;

		output += `${textTable(
			results.map((result) => {
				return [
					'',
					chalk.red('error'),
					result.message.plain,
					chalk.dim(result.rule || '')
				];
			}),
			{
				stringLength: (text) => {
					return stripAnsi(text).length;
				}
			}
		)}`;

		output += chalk.red.bold(`\n\n${figures.cross} ${pluralize('error', count, true)}`);

		// Resets output color, for prevent change on top level
		return chalk.reset(output);
	}

	return '';
};
