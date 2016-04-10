import scatterPost from './routes/scatter/post';
import scatterGet from './routes/scatter/get';
import config from './config';
import resError from './middleware/resError';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import ping from 'middle-pinger';
import parser from 'body-parser';

const app = express();
const server = http.createServer(app);
const routes = [
  scatterPost,
  scatterGet
];

app.use(config('IS_PROD') ? morgan('tiny') : morgan('dev'));
app.use(ping());
app.use(parser.json());
app.use(resError);

routes.forEach((routeInit) => {
  routeInit(app);
});

server.listen(config('PORT'));

export default server;
