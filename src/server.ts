import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import logger from './shared/logger';

process.on('uncaughtException', (err) => {
  logger.error(err);
  console.log('Uncought exception detected!!! ');
  process.exit(1);
});

let server: Server;
const connect = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Connect successfully!!!');
    server = app.listen(config.port, () => {
      logger.info(`Server is listening on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Connect failure!!!');
  }
  process.on('unhandledRejection', (err) => {
    console.log('Unhandled rejection!!! We are closing the server');
    if (server) {
      server.close(() => {
        logger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};
connect();

process.on('SIGTERM', () => {
  logger.info('SIGTERM received!!! Shutting down gracefully');
  if (server) {
    server.close(() => {
      console.log('Process terminated!!!');
    });
  }
});
