import _ from 'lodash';
/* -----------------handle field for mongo filter------------------------ */
function handleFields(req, res, next) {
  const fields = req.query.fields;
  let fieldsJson = {};
  if (typeof fields !== 'undefined') {
    fieldsJson = _.reduce(fields.split(','), (acc, f) => {
      acc[f] = 1;
      return acc;
    }, {});
  }
  req.query.fields = fieldsJson;
  next();
}

function handleListParams(req, res, next) {
	/* -----------------handle page and count------------------------ */
  const page = typeof req.query.page === 'undefined' ? 0 : parseInt(req.query.page, 10);
  const limit = typeof req.query.count === 'undefined' ? 10 : parseInt(req.query.count, 10);
  const skip = page * limit;

  req.query = { limit, skip };

	/* -----------------handle sort------------------------ */
  const sorts = req.query.sorts;
  let sortsJson = {};
  if (typeof sorts !== 'undefined') {
    sortsJson = _.reduce(sorts.split(','), (acc, f) => {
      if (f.startsWith('-')) {
        acc[f.substr(1)] = -1;
      } else {
        acc[f] = 1;
      }
      return acc;
    }, {});
  }
  req.query.sorts = sortsJson;
  next();
}

export default { handleFields, handleListParams };
