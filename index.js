const scatterPost = require('./routes/scatterChart/post');
const linePost = require('./routes/lineChart/post');
const barPost = require('./routes/barChart/post');
const chartGeneratedGet = require('./routes/generatedCharts/get');
const config = require('./config');
const resError = require('./middleware/resError');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const ping = require('middle-pinger');
const parser = require('body-parser');
const relquire = require('relquire');
const app = express();
const server = http.createServer(app);
const routes = [
  scatterPost,
  linePost,
  barPost,
  chartGeneratedGet
];

app.engine('ejs', require('ejs-mate'));
app.set('view engine', 'ejs');
app.set('views', relquire.resolve('~/views'));
app.use(config('IS_PROD') ? morgan('tiny') : morgan('dev'));
app.use(ping());
app.use(parser.json());
app.use(resError);

routes.forEach((routeInit) => {
  routeInit(app);
});

server.listen(config('PORT'));

module.exports = server;
