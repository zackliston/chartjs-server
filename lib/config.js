import path from 'path';
const cwd = __dirname;

const version = require(path.join(cwd, '../package.json')).version.split('.');

const configData = {
  IS_PROD: process.env.NODE_ENV === 'production',
  PORT: 9076,
  VERSION: {
    MAJOR: version[0],
    MINOR: version[1],
    PATCH: version[2]
  }
};


function config(key) {
  return configData[key];
}

export default config;
