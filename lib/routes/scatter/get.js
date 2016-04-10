import base64 from 'base-64';
import scatterChart from '../../charts/scatter';

const DEFAULTS = {
  HEIGHT: 50,
  WIDTH: 150
};

function init(app) {
  app.get('/charts/scatter', (req, res) => {
    const stringData = base64.decode(req.query.data);
    const width = Number(req.query.width || DEFAULTS.WIDTH);
    const height = Number(req.query.height || DEFAULTS.HEIGHT);

    const data = JSON.parse(stringData);
    const upperLimit = data.highRiskThreshold;
    const lowerLimit = data.moderateRiskThreshold;
    const points = data.points;

    return scatterChart(width, height, upperLimit, lowerLimit, points)
    .then((imgBuffer) => {
      res.type('png');
      res.send(imgBuffer);
    }, res.error);
  });
}

export default init;
