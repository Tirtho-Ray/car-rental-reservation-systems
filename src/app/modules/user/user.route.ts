import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
// import auth from '../../middleware/auth';
// import { user_role } from './user.constant';

const router = express.Router();

 
// router.post('/signup',validateRequest(UserValidation.UserSchemaValidation),auth(user_role.admin),UserController.createUser);
router.post('/signup',validateRequest(UserValidation.UserSchemaValidation),UserController.createUser);
router.post("/signin", UserController.login);
export const UserRoutes = router;
