const boom = require('boom');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);

const client = redis.createClient({ host: 'redis' });

function init(app) {
  app.get('/charts/generated/:id', (req, res) => {
    const id = req.params.id;
    return client.getAsync(id)
    .then((base64Image) => {
      if (!base64Image) {
        return res.error(boom.notFound());
      }
      res.type('png');
      return res.end(new Buffer(base64Image, 'base64'));
    });
  });
}

module.exports = init;
