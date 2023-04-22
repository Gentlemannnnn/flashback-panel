/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')();
// const { i18n } = require('./next-i18next.config.old');
const path = require("path");

module.exports = withTM({
	reactStrictMode: true,
	// locales: ['en', 'fr'],
	// defaultLocale: 'en',
	output: 'standalone',
	experimental: {
		outputFileTracingRoot: path.join(__dirname, "../../"),
	},
	swcMinify: true,
	async rewrites() {
		return [
			{
				source: '/',
				destination: '/dashboard',
			},
		];
	},
	// i18n,
});
