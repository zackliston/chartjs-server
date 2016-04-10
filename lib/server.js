const cluster = require('cluster');
const os = require('os');

// [KE] no need to cluster during local dev
let numCPUs = os.cpus().length;
if (process.env.NODE_ENV !== 'production') {
  numCPUs = 1;
}

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', cluster.fork);
} else {
  require('./index');
}
