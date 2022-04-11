const config = require('./config');

const envConfig =
	process.env.NODE_ENV === 'development' ? config.dev : config.prod;

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [new URL(envConfig.static.url).hostname],
	},
};

module.exports = nextConfig;
