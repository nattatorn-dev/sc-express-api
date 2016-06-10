import Promise from 'bluebird';
import redisCache from 'express-redis-cache';
import config from './env';

let client = redisCache(config.redis);
client =  Promise.promisifyAll(client);

export default client;