module.exports = {
	extends: '@configs/eslint-config/adonis',
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
		ecmaVersion: 2018,
		sourceType: 'module',
	},
};
