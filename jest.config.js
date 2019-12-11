const Path = require('path');
const { defaults } = require('jest-config');
const klawSync = require('klaw-sync')
const mm = require('micromatch')
// Note: rootDir is relative to the directory containing this file.
const rootDir = '.';
const { testMatch } = defaults;

// TODO: Add the paths to the test suites that need to be run
// sequentially to this array.
const sequentialTestPathMatchPatterns = [
  './sample/appendObjects.js',
  './sample/createBucket.js',
];

const parallelTestPathIgnorePatterns = [
];

let testPathIgnorePatterns = [
  parallelTestPathIgnorePatterns,
  sequentialTestPathMatchPatterns,
];

const sequential = process.argv.includes('--runInBand');
if (sequential) {
  const absRootDir = Path.resolve(__dirname, rootDir);
  let filenames = klawSync(absRootDir, { nodir: true })
    .map(file => file.path)
    .map(file => file.replace(absRootDir, ''))
    .map(file => file.replace(/\\/g, '/'))
    .map(file => '<rootDir>' + file);
  filenames = mm(filenames, testMatch);
  testPathIgnorePatterns = mm.not(filenames, sequentialTestPathMatchPatterns);
}
module.exports = {
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    //testResultsProcessor: "jest-allure-reporter",
    testRegex: '(/testsdk/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    reporters:["default",
    "jest-html-reporters"]
  }