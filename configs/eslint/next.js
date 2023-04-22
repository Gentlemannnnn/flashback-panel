module.exports = {
	env: {
		browser: true,
		node: true,
	},
	extends: ['next', 'airbnb', 'airbnb-typescript', './base'],
	settings: {
		'next': {
			rootDir: ['apps/*/', 'packages/*/'],
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.ts', '.jsx', '.tsx'],
				moduleDirectory: ['node_modules', '.'],
			},
		},
	},
	rules: {
		'react/function-component-definition': [
			2,
			{
				namedComponents: 'arrow-function',
			},
		],
		'@next/next/no-html-link-for-pages': 'off',
		'react/require-default-props': 'off',
		'react/jsx-props-no-spreading': 'off',
		'jsx-a11y/anchor-is-valid': 'off',
		'no-param-reassign': [
			'error',
			{ props: true, ignorePropertyModificationsFor: ['state'] },
		],
	},
	overrides: [
		{
			env: {
				jest: true,
			},
			files: [
				'**/__tests__/**/*.[jt]s?(x)',
				'**/?(*.)+(spec|test|stories).[jt]s?(x)',
				'*(cypress|jest).config.*',
			],
			extends: ['plugin:testing-library/react', 'plugin:jest/recommended'],
			rules: {
				'import/no-extraneous-dependencies': [
					'error',
					{ devDependencies: true, peerDependencies: true },
				],
			},
		},
	],
};
