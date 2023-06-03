import mongoose from 'mongoose';
import config from './config';
import app from './app';
import logger from './shared/logger';

const connect = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Connect successfully!!!');
    app.listen(config.port, () => {
      logger.info(`Server is listening on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Connect failure!!!');
  }
};
connect();
