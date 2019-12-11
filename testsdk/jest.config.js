const Path = require('path');
const { defaults } = require('jest-config');
const klawSync = require('klaw-sync')
const mm = require('micromatch')
// Note: rootDir is relative to the directory containing this file.
const rootDir = './src';
const { testMatch } = defaults;

// TODO: Add the paths to the test suites that need to be run
// sequentially to this array.
const sequentialTestPathMatchPatterns = [
  './src/listBuckets.js',
  './src/createBucket.js',
  './src/appendObject.test.js'
];

const parallelTestPathIgnorePatterns = [
];

let testPathIgnorePatterns = [
  ...parallelTestPathIgnorePatterns,
  ...sequentialTestPathMatchPatterns,
];

const sequential = process.argv.includes('--runInBand');
if (sequential) {
  const absRootDir = Path.resolve(__dirname, rootDir);
  let filenames = klawSync(absRootDir, { nodir: true })
     .map(file => file.path)
     .map(file => file.replace(absRootDir, ''))
     .map(file => file.replace(/\\/g, '/'))
     .map(file => rootDir + file);
  filenames = mm(filenames, testMatch);
  console.log(filenames)
  testPathIgnorePatterns = mm.not(filenames, sequentialTestPathMatchPatterns);
}
module.exports = {
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    reporters:["default",
    ["jest-html-reporters", {
      "publicPath": "./report",
      "filename": "report.html",
      "expand": true
    }]
  ],
    testMatch,
    testPathIgnorePatterns
  }