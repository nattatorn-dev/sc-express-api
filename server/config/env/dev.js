const config = {
  env: 'development',
  mongo: {
    url: 'mongodb://localhost:27017/sc-express-db',
  },
  redis: {
    host: 'localhost',
    port: 6379,
    expire: {
      200: 1,
      304: 1,
      xxx: 1,
    },
    prefix: 'dev_sc_express_api',
  },
  port: 3000,
  logger: {
    method: 'console',
    level: 'debug',
    filePath: '',
  },
};

export default config;
