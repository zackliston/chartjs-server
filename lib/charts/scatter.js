import BPromise from 'bluebird';
import Canvas from 'canvas';
import Chart from 'nchart';
import initChart from '../utils/initializeChart';

function scatterChart(width, height, upperLimit, lowerLimit, points) {
  return BPromise.try(() => {
    const canvas = new Canvas(width, height);
    const ctx = canvas.getContext('2d');
    const chartData = [
      {
        strokeColor: '#404040',
        pointColor: '#404040',
        pointStrokeColor: '#fff',
        data: points
      }
    ];

    const chartOptions = {
      scaleType: 'date',
      scaleShowVerticalLines: false,
      scaleShowHorizontalLines: false,
      bezierCurve: false,
      showScale: false,
      showTooltips: false,
      pointDotRadius: 0
    };

    BPromise.promisify(canvas.toBuffer);
    initChart(upperLimit, lowerLimit);
    const chart = new Chart(ctx).eCart(chartData, chartOptions);
    chart.draw();

    return canvas.toBuffer();
  });
}

export default scatterChart;
