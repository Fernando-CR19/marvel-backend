'use strict'

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import http from 'http';
import app from "./app";

const server = http.createServer(app);

/**
 * start server
 */
setImmediate(() => {
  server.listen(3000, "0.0.0.0", () => {
    console.log('Express server listening on %d, in %s mode');
  });  
});