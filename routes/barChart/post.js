const uuid = require('uuid');
const redis = require('redis');
const barChart = require('../../charts/bar');

const client = redis.createClient({ host: 'redis' });

const DEFAULTS = {
  HEIGHT: 200,
  WIDTH: 300
};
const FIVE_MINUTES = String(60 * 5);

function init(app) {
  app.post('/charts/bar', (req, res) => {
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
      client.expire(id, FIVE_MINUTES);

      return res.json({
        chartHref: `/charts/generated/${id}`
      });
    }, res.error);
  });
}

module.exports = init;
