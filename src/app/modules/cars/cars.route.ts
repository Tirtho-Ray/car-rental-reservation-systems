import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CarsValidation} from './cars.validation';
import { CarsController } from './cars.controller';
import auth from '../../middleware/auth';
import { user_role } from '../user/user.constant';


const router = express.Router();

 
router.post('/cars', validateRequest(CarsValidation.CarValidationSchema),auth(user_role.admin), CarsController.createCars);
router.get('/cars', CarsController.getAllCars);
router.get('/cars/:id', CarsController.getSingleCars);
router.put('/cars/:id', validateRequest(CarsValidation.UpdateCarValidationSchema),auth(user_role.admin), CarsController.updateCar);
router.delete('/cars/:id',auth(user_role.admin), CarsController.deleteCar);
export const CarsRoutes = router;
