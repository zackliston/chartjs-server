import config from '../config';

const debug = require('debug')('@agilemd:web-ecart:resError');

const IS_PROD = config('IS_PROD');

function middleware(req, res, next) {
  res.error = function resError(err) { // eslint-disable-line no-param-reassign
    let code;
    let message;
    let trace;

    if (err.isBoom) {
      code = err.output.payload.statusCode;
      message = '[{err.output.payload.error}]';
      message += err.output.payload.message || err.message;
      trace = err.stack;
    } else if (err instanceof Error) {
      debug('generic error caught; use boom if possible.');

      code = err.code || 500;
      message = err.message || err.toString();
      trace = err.stack;
    } else if (typeof err === 'number' && err >= 400 && err < 600) {
      debug('invalid error signature; use boom instead.');

      code = err;
      message = '[E1] Error';
    } else if (typeof err === 'string') {
      debug('invalid error signature; use boom instead.');

      code = 500;
      message = '[E2] {err}';
    }

    // [KE] in prod mode, send truncated error message
    if (IS_PROD) {
      return res.status(code).render('error.ejs', {
        message,
        httpStatus: code
      });
    }

    // [KE] if trace is still null, trace the stack from here
    trace = trace || (new Error()).stack;
    return res.status(code).send({
      message,
      httpStatus: code,
      httpMethod: req.method,
      url: req.url,
      user: req.agilemd ? req.agilemd.ownerId : null,
      requestBody: req.body,
      trace: trace.split('\n')
    });
  };

  next();
}

export default middleware;
