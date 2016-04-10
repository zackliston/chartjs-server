import scatterChart from '../../charts/scatter';

function init(app) {
  app.post('/chart/scatter', (req, res) => {
    const width = req.body.width;
    const height = req.body.height;
    const upperLimit = req.body.highRiskThreshold;
    const lowerLimit = req.body.moderateRiskThreshold;
    const points = req.body.points;

    return scatterChart(width, height, upperLimit, lowerLimit, points)
    .then((imgBuffer) => {
      res.type('png');
      res.send(imgBuffer);
    }, res.error);
  });
}

export default init;
