import _ from 'lodash';

import devConfig from './dev';
import uatConfig from './uat';
import prodConfig from './prod';

// common config
const config = {
  root: 'Hello',
};

switch (process.env.NODE_ENV || 'dev') {
  case 'prod':
    _.assign(config, prodConfig);
    break;
  case 'uat':
    _.assign(config, uatConfig);
    break;
  case 'dev':
  default:
    _.assign(config, devConfig);
    break;
}

export default config;
