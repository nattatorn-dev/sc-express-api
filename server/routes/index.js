import express from 'express';
import userRoutes from './user';

const router = express.Router();	// eslint-disable-line new-cap

// mount user routes at /users
router.use('/users', userRoutes);

export default router;