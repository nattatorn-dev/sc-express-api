

import devConfig from './dev';
import uatConfig from './uat';
import prodConfig from './prod';

// common config
let config = {}; // eslint-disable-line import/no-mutable-exports

switch (process.env.NODE_ENV || 'dev') {
  case 'prod':
    config = { ...config, ...prodConfig };
    break;
  case 'uat':
    config = { ...config, ...uatConfig };
    break;
  case 'dev':
  default:
    config = { ...config, ...devConfig };
    break;
}

export default config;
