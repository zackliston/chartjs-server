import BPromise from 'bluebird';
import Canvas from 'canvas';
import Chart from 'nchart';

function lineChart(chartData, chartOptions, width, height) {
  return BPromise.try(() => {
    const canvas = new Canvas(width, height);
    const ctx = canvas.getContext('2d');

    BPromise.promisify(canvas.toBuffer);
    const chart = new Chart(ctx).Line(chartData, chartOptions);
    chart.draw();

    return canvas.toBuffer();
  });
}

export default lineChart;
