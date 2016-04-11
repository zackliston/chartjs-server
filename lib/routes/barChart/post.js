import uuid from 'uuid';
import redis from 'redis';
import barChart from '../../charts/bar';
import config from '../../config';

const client = redis.createClient(config('CACHE_REDIS'));

const DEFAULTS = {
  HEIGHT: 200,
  WIDTH: 300
};

function init(app) {
  app.post('/charts/scatter', (req, res) => {
    const width = req.body.width || DEFAULTS.WIDTH;
    const height = req.body.height || DEFAULTS.HEIGHT;
    const chartData = req.body.chartData;
    const chartOptions = req.body.chartOptions;


    return barChart(
      chartData,
      chartOptions,
      width,
      height
    )
    .then((imgBuffer) => {
      const id = uuid.v4();
      client.set(id, imgBuffer.toString('base64'));
      return res.json({
        chartHref: '/charts/generated/' + id
      });
    }, res.error);
  });
}

export default init;
