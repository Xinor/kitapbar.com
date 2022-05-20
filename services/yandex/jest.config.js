const path = require('path');
const { compilerOptions } = require('./tsconfig');
const {config} = require('dotenv');
config({path: path.resolve(process.cwd(), '.env.test')});

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    "./src/__test__/setup.ts"
  ],
  modulePaths: [compilerOptions.baseUrl],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
};
