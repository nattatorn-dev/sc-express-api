const config = {
  env: 'development',
  mongo: {
    url: 'mongodb://localhost:27017/sc-express-db-es6',
  },
  redis: {
    host: 'localhost',
    port: 6379,
    expire: {
      200: 1,
      304: 1,
      xxx: 1,
    },
    prefix: 'dev_sc_express_api_es6',
  },
  telegram: {
    token: '210283076:AAG6h03p4wb2Kt1hP8qmRd2bCnl5U2ZDKx0',
    chatId: '67890566',
  },
  port: 3000,
  logger: {
    method: 'console',
    level: 'debug',
    filePath: '',
  },
};

export default config;
