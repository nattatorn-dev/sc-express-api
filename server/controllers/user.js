import User from '../models/user';
import co from 'co';
import NotFound from '../helpers/NotFound';
import Response from '../helpers/Response';
import cache from '../config/cache';
const cacheKey = "*/v1/users*";

async function getUsers(req, res, next) {
	const query = {
		userName : {$regex: new RegExp(req.query.userName,"i")},
		email : {$regex: new RegExp(req.query.email,"i")},
		mobile : {$regex: new RegExp(req.query.mobile,"i")}
	};

	const limit = req.query.limit;
	const skip  = req.query.skip;
	const fields = req.query.fields;
	const sorts = req.query.sorts;

	const usersObj = await User.find(query,fields).sort(sorts).limit(limit).skip(skip).execAsync();
	const total = await User.count(query).execAsync();
	const data = {users : usersObj, total : total};
	next(new Response(data));
}

async function getUser(req, res, next) {
	const fields = req.query.fields;
	const query = {userId : req.params.userId};

	const userObj = await User.findOneAsync(query,fields);
	if(!userObj){
		next(new NotFound());
	}else{
		const data = {user : userObj};
		next(new Response(data));
	}
}

async function createUser(req, res, next) {
	const user = new User({
		userName : req.body.userName,
		email : req.body.email,
		mobile : req.body.mobile
	});

	const userObj = await user.saveAsync();
	await cache.delAsync(cacheKey);
	const data = {user : userObj};
	next(new Response(data));
}

async function updateUser(req, res, next) {
	const query = {userId : req.params.userId };
	const user = { $set : {
		userName : req.body.userName,
		email : req.body.email,
		mobile : req.body.mobile
	}};

	const option = {
		new : true
	}

	const userObj = await User.findOneAndUpdate(query,user,option).execAsync();

	if(!userObj){
		next(new NotFound());
	}else{
		await cache.delAsync(cacheKey);
		const data = {user : userObj};
		next(new Response(data));
	}
}

async function deleteUser(req, res, next) {
	const query = {userId : req.params.userId};
	const userObj = await User.findOneAndRemoveAsync(query);
	console && console.log(userObj);
	if(!userObj){
		next(new NotFound());
	}else{
		await cache.delAsync(cacheKey);
		const data = {user : userObj};
		next(new Response(data));
	}
}

export default {getUsers, getUser, createUser, updateUser, deleteUser};
