// eslint-disable-next-line @typescript-eslint/no-var-requires
const { config } = require('dotenv')
config()

module.exports = {
	roots: ['<rootDir>'],
	testMatch: ['**/?(*.)(spec|test).ts?(x)'],
	testPathIgnorePatterns: ['node_modules'],
	transform: {
		'^.+\\.(t|j)sx?$': 'ts-jest',
	},
}
