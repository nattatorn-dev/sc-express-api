import Promise from 'bluebird';
import mongoose from 'mongoose';
import config from './env';
import logger from './logger';

// promisify mongoose
Promise.promisifyAll(mongoose);

// connect to mongo db
mongoose.connect(config.mongo.url, { server: { socketOptions: { keepAlive: 1 } } });

mongoose.connection.on('open', () => {
  logger.info('[MONGO] connected');
});

mongoose.connection.on('error', () => {
  logger.error('[MONGO] fail to connect: %s', config.mongo.url);
});

export default mongoose;
