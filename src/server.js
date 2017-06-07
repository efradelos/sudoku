import bodyParser from 'body-parser';
import http from 'http';
import express from 'express';
import PrettyError from 'pretty-error';
import path from 'path';

import assets from './assets'; // eslint-disable-line import/no-unresolved
import { port, host } from './config';

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('*', async (req, res, next) => {
  try {
    const template = require('./views/index.hbs'); // eslint-disable-line global-require
    res.status(200).send(template({ entry: assets.client.js }));
  } catch (error) {
    next(error);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (req.method === 'GET' && err.name === 'UnauthorizedError') {
    res.redirect('/login');
    return;
  }
  console.log(pe.render(err)); // eslint-disable-line no-console
  const template = require('./views/error.hbs'); // eslint-disable-line global-require
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send(template({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  }));
});

server.listen(port, () => {
  console.log(`The server is running at ${host}/`); // eslint-disable-line no-console
});
