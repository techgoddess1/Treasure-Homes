import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from './docs/swagger';
import UserMiddleware from './middlewares/UserMiddleware';
import UserController from './controllers/UserController';
import PropertyMiddleware from './middlewares/PropertyMiddleware';
import PropertyController from './controllers/PropertyController';
import TokenMiddleware from './middlewares/TokenMiddleware';
import ImageUploader from './middlewares/ImageMiddleware';

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

// Property routes
router.post(
  '/properties',
  TokenMiddleware.checkToken,
  PropertyMiddleware.validateCreate,
  PropertyController.create
);
router.get(
  '/properties/:property_id',
  TokenMiddleware.checkToken,
  PropertyMiddleware.validateParam,
  PropertyController.getProperty
);
router.get(
  '/properties',
  TokenMiddleware.checkToken,
  PropertyController.getAll,
  PropertyMiddleware.validateStatus,
  PropertyController.getPropertiesByStatus
);
router.delete(
  '/properties/:property_id',
  TokenMiddleware.checkToken,
  PropertyMiddleware.validateParam,
  PropertyMiddleware.validateAdmin,
  PropertyController.delete
);

export default router;
