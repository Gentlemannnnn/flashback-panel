module.exports = {
	preset: 'ts-jest',
	resetMocks: true,
	moduleDirectories: ['node_modules'],
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['@testing-library/jest-dom'],
	collectCoverageFrom: ['**/src/**/*.{js,ts,jsx,tsx}'],
	moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
	transform: {
		'^.+\\.tsx?$': 'esbuild-jest',
		'^.+\\.jsx?$': 'esbuild-jest',
	},
	coveragePathIgnorePatterns: [],
	coverageThreshold: null,
};
