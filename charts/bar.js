const BPromise = require('bluebird');
const Canvas = require('canvas');
const Chart = require('nchart');

function barChart(chartData, chartOptions, width, height) {
  return BPromise.try(() => {
    const canvas = new Canvas(width, height);
    const ctx = canvas.getContext('2d');

    BPromise.promisify(canvas.toBuffer);
    const chart = new Chart(ctx).Bar(chartData, chartOptions);
    chart.draw();

    return canvas.toBuffer();
  });
}

module.exports = barChart;
