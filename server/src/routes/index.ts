import express from 'express';
import authRoute from './auth.router';
import userRoute from './user.router';

const routers = express.Router();

// Mount the individual routes here
routers.use('/v1/auth', authRoute);
routers.use('/v1/user', userRoute);

// Export the routes
export default routers;