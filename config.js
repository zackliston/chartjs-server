const path = require('path');
const cwd = __dirname;

const version = require(path.join(cwd, './package.json')).version.split('.');

const configData = {
  IS_PROD: process.env.NODE_ENV === 'production',
  PORT: 9076,
  CACHE_REDIS: 'redis://localhost:6379/0',
  VERSION: {
    MAJOR: version[0],
    MINOR: version[1],
    PATCH: version[2]
  }
};


function config(key) {
  return configData[key];
}

module.exports = config;
