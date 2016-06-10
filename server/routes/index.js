import express from 'express';
import userRoutes from './user';
import cache from '../config/cache';

const router = express.Router();	// eslint-disable-line new-cap

//redis cache
//only cache for GET Method
router.get('*',cache.route());
// mount user routes at /users
router.use('/users', userRoutes);

export default router;