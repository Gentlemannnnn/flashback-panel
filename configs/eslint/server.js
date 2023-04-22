module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ['airbnb-base', 'airbnb-typescript/base', './base'],
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.ts'],
				moduleDirectory: ['node_modules', 'src/'],
			},
		},
	},
};
