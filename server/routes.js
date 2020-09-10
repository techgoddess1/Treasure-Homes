import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from './docs/swagger';
import UserMiddleware from './middlewares/UserMiddleware';
import UserController from './controllers/UserController';
import TokenMiddleware from './middlewares/TokenMiddleware';

const router = express.Router();

// Documentation;
router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDoc));

// Auth routes
router.post(
  '/auth/signup',
  UserMiddleware.validateSignup,
  UserMiddleware.validateEmail,
  UserMiddleware.validatePassword,
  UserMiddleware.validateUser,
  UserController.create
);
router.post(
  '/auth/signin',
  UserMiddleware.validateLogin,
  UserMiddleware.validateEmail,
  UserMiddleware.validatePassword,
  UserController.signin
);

export default router;
