//--------------------------------------------------------
//-- Config error
//--------------------------------------------------------

/**
 * Configuration error.
 *
 * @augments Error
 */
class ConfigError extends Error {

	/**
	 * Create configuration error.
	 *
	 * @param {string} message - Configuration error.
	 */
	constructor(message) {
		super(message);
		this.name = 'ConfigError';
	}

}

export default ConfigError;
