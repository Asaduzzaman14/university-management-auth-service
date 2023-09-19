import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorlogger } from './shared/logger';

import { Server } from 'http';
import { RedisClient } from './shared/redis';
import subscriveToEvents from './app/events';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await RedisClient.connect().then(() => subscriveToEvents());

    await mongoose.connect(config.database_url as string);
    logger.info('database connection successfull');

    server = app.listen(config.port, () => {
      logger.info(`express app is listining in port ${config.port}`);
    });
  } catch (error) {
    errorlogger.error('Failed to connect database', error);
  }

  process.on('unhandledRejection', error => {
    // console.log('unhandel Rejection ');

    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is receivde');
  if (server) {
    server.close();
  }
});
