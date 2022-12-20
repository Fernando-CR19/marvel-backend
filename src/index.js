'use strict'
import dynamoose from 'dynamoose'

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import * as dotenv from "dotenv"
dotenv.config()
import http from 'http';
import app from "./app";

const ddb = new dynamoose.aws.ddb.DynamoDB({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAcessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1"
});

dynamoose.aws.ddb.set(ddb)

const server = http.createServer(app);

/**
 * start server
 */
setImmediate(() => {
  server.listen(4000, "0.0.0.0", () => {
    console.log('Deu certo');
  });
});