import express from 'express';
import userController from '../controllers/user.controller';
import Middleware from '../middleware';
import { validateUpdate } from '../dto/obj/user.dto';

const router = express.Router();

router.post('/updateUser/:id', Middleware.AuthMiddleware.verifyToken, validateUpdate, Middleware.ValidationResponse.checkValidationResult, userController.updateUser)

router.get('/getById/:id', Middleware.AuthMiddleware.verifyToken, userController.getUserById)

router.get('/getAll', Middleware.AuthMiddleware.verifyToken, Middleware.AuthMiddleware.verifyPermission(["admin"]), userController.getAllUsers)

export default router;