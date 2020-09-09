import express from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from './docs/swagger';

const router = express.Router();

// Documentation;
router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDoc));

export default router;
