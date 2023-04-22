module.exports = {
	extends: ['./server', 'plugin:adonis/typescriptApp', 'prettier'],
	rules: {
		'import/no-unresolved': 'off',
		'no-param-reassign': [
			'error',
			{ props: true, ignorePropertyModificationsFor: ['ret'] },
		],
		'no-underscore-dangle': ['error', { allow: ['_id', '__t', '__v'] }],
		'func-names': 'off',
	},
	overrides: [
		{
			files: [
				'japaFile.ts',
				'**/contracts/tests.ts',
				'**/tests/**/*.[jt]s',
				'**/?(*.)+(spec|test).[jt]s',
			],
			rules: {
				'import/no-extraneous-dependencies': [
					'error',
					{ devDependencies: true, peerDependencies: true },
				],
			},
		},
	],
};
