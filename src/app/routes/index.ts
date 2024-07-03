import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { CarsRoutes } from '../modules/cars/cars.route';
import { BookingRoutes } from '../modules/booking/booking.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/',
    route: CarsRoutes,
  },
  {
    path: '/',
    route: BookingRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));
export default router;



