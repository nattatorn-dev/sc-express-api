import Promise from 'bluebird';
import mongoose from 'mongoose';
import config from './config/env';
import app from './config/express';
// promisify mongoose
Promise.promisifyAll(mongoose);

// connect to mongo db
mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
	throw new Error('unable to connect to database: ${config.db}');
});

const debug = require('debug');

// listen on port config.por
app.listen(config.port, () => {
 	debug(`server started`);
 });

export default app;
