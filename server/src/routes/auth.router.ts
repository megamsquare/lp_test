import express from 'express';
import Auth_controller from '../controllers/auth.controller';
import Middleware from '../middleware';
import { validateLogin, validateSignUp } from '../dto/obj/auth.dto';

const router = express.Router();

router.post('/register', validateSignUp, Middleware.ValidationResponse.checkValidationResult, Auth_controller.signUp);

router.post('/login', validateLogin, Middleware.ValidationResponse.checkValidationResult, Auth_controller.signIn);

export default router;