import User from '../models/user';

import NotFound from '../helpers/NotFound';
import Response from '../helpers/Response';
import cache from '../config/cache';
const cacheKey = '*/v1/users*';

async function getUsers(req, res, next) {
  const query = {
    userName: { $regex: new RegExp(req.query.userName, 'i') },
    email: { $regex: new RegExp(req.query.email, 'i') },
    mobile: { $regex: new RegExp(req.query.mobile, 'i') },
  };
  const { limit, skip, fields, sorts } = req.query;
  const users = await User.find(query, fields).sort(sorts).limit(limit)
	.skip(skip)
	.execAsync();
  const total = await User.count(query).execAsync();
  const data = { users, total };
  next(new Response(data));
}

async function getUser(req, res, next) {
  const fields = req.query.fields;
  const query = { userId: req.params.userId };

  const user = await User.findOneAsync(query, fields);
  if (!user) {
    next(new NotFound());
  } else {
    const data = { user };
    next(new Response(data));
  }
}

async function createUser(req, res, next) {
  const userParam = new User({
    userName: req.body.userName,
    email: req.body.email,
    mobile: req.body.mobile,
  });

  const user = await userParam.saveAsync();
  await cache.delAsync(cacheKey);
  const data = { user };
  next(new Response(data));
}

async function updateUser(req, res, next) {
  const query = { userId: req.params.userId };
  const userParam = {
    $set: {
      userName: req.body.userName,
      email: req.body.email,
      mobile: req.body.mobile,
    },
  };

  const option = { new: true };
  const user = await User.findOneAndUpdate(query, userParam, option).execAsync();

  if (!user) {
    next(new NotFound());
  } else {
    await cache.delAsync(cacheKey);
    const data = { user };
    next(new Response(data));
  }
}

async function deleteUser(req, res, next) {
  const query = { userId: req.params.userId };
  const user = await User.findOneAndRemoveAsync(query);
  if (!user) {
    next(new NotFound());
  } else {
    await cache.delAsync(cacheKey);
    const data = { user };
    next(new Response(data));
  }
}

export default { getUsers, getUser, createUser, updateUser, deleteUser };
