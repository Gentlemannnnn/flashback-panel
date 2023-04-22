module.exports = {
	extends: '@configs/eslint-config/next',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
	},
};
