
function initializeChart(highRiskThreshold, moderateRiskThreshold) {
  require('./scatterChart');
  const Chart = require('nchart');

  Chart.types.Scatter.extend({
    name: 'eCart',
    initialize: function init() {
      Chart.types.Scatter.prototype.initialize.apply(this, arguments);
      this.originalClear = this.clear;

      this.clear = function clear() {
        const scale = this.scale;
        const xStart = scale.xPadding + 1;
        const yPadding = 3;
        const width = scale.chart.width;
        let heightPerPoint;
        let yMax;
        let transitionPoint;

        if (scale.yScaleRange) {
          yMax = scale.yScaleRange.max;
          const range = yMax - scale.yScaleRange.min;
          heightPerPoint = (scale.chart.height - scale.yPadding) / range;
          transitionPoint = (yMax - highRiskThreshold) * heightPerPoint + yPadding;
        }
        this.originalClear();
        this.chart.ctx.fillStyle = 'rgb(254,188,8)';
        this.chart.ctx.fillRect(
          xStart,
          transitionPoint,
          width,
          heightPerPoint * (highRiskThreshold - moderateRiskThreshold)
        );

        this.chart.ctx.fillStyle = 'rgb(237,104,74)';
        this.chart.ctx.fillRect(xStart, yPadding, width, transitionPoint - yPadding);
      };
    }
  });
}

module.exports = initializeChart;
