import path from 'path';
const cwd = __dirname;

const version = require(path.join(cwd, '../package.json')).version.split('.');

const configData = {
  IS_PROD: process.env.NODE_ENV === 'production',
  PORT: 9076,
  CACHE_REDIS: 'redis://192.168.99.100:6379/0',
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
