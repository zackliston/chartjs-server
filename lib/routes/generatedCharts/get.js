import boom from 'boom';
import redis from 'redis';
import config from '../../config';
import bluebird from 'bluebird';
bluebird.promisifyAll(redis.RedisClient.prototype);

const client = redis.createClient(config('CACHE_REDIS'));

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

export default init;
