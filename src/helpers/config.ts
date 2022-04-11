import defaultConfig from '../../config';

const config =
	process.env.NODE_ENV === 'development' ? defaultConfig.dev : defaultConfig.prod;

export default config;
