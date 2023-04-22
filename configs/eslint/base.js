module.exports = {
	extends: [
		'plugin:import/recommended',
		'plugin:import/typescript',
		'prettier',
	],
	plugins: ['@typescript-eslint', 'import', 'prettier'],
	parser: '@typescript-eslint/parser',
	settings: {
		'import/extensions': ['.js', '.jsx', '.tsx', '.ts'],
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: [
					'services/*/tsconfig.json',
					'apps/*/tsconfig.json',
					'packages/*/tsconfig.json',
				],
			},
		},
	},
	rules: {
		'prettier/prettier': 'error',
		'import/prefer-default-export': 'off',
		'class-methods-use-this': 'off',
		'no-template-curly-in-string': 'off',
		'consistent-return': 'off',
		'no-console': ['error', { allow: ['warn', 'error'] }],
	},
	ignorePatterns: [
		'**/*.js',
		'**/*.json',
		'node_modules',
		'public',
		'lib',
		'.next',
		'coverage',
		'dist',
		'.build',
		'.turbo',
	],
};
