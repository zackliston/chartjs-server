const BPromise = require('bluebird');
const Canvas = require('canvas');
const Chart = require('nchart');
const initChart = require('../utils/initializeChart');

function scatterChart(chartData, chartOptions, width, height, upperLimit, lowerLimit) {
  return BPromise.try(() => {
    const canvas = new Canvas(width, height);
    const ctx = canvas.getContext('2d');

    BPromise.promisify(canvas.toBuffer);
    initChart(upperLimit, lowerLimit);
    const chart = new Chart(ctx).eCart(chartData, chartOptions);
    chart.draw();

    return canvas.toBuffer();
  });
}

module.exports = scatterChart;
