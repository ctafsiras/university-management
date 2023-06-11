import express from 'express';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { UserRoutes } from '../modules/users/user.route';
const router = express.Router();

const routeModule = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRoutes,
  },
];

routeModule.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
