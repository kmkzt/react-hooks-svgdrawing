module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest'
  },
  testRegex: '(\\.|/)(test|spec)\\.(t|j)sx?$',
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.(t|j)s?(x)']
}
