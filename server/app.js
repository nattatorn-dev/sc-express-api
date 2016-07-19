import Promise from 'bluebird';
import mongoose from 'mongoose';
import config from './config/env';
import app from './config/express';
import logger from './config/logger';

// promisify mongoose
Promise.promisifyAll(mongoose);

// connect to mongo db
mongoose.connect(config.mongo.url, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  logger.error('unable to connect to database: %s', config.db);
});

// listen on port config.por
app.listen(config.port, () => {
  logger.info('server started at port [%s]', config.port);
});

export default app;
