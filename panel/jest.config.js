const nextJest = require('next/jest');
const jestConfig = require('@configs/jest/config');

const createJestConfig = nextJest({
	dir: './',
});

module.exports = createJestConfig(jestConfig);
