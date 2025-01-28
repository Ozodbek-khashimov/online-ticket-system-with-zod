import { Router } from 'express';
import { validate, ValidationError } from 'express-validation';
import { authController } from '../controllers/index.js';
import { loginValidation, userLoginSchema, userRegistrationSchema } from '../validation/index.js';
import { validateData } from '../middlewares/validationmiddleware.js';


export const authRouter = Router();

authRouter.post(
  '/register',
  validateData(userRegistrationSchema),
  authController.register,
);
authRouter.post(
  '/login',
  validateData(userLoginSchema),
  authController.login,
);
authRouter.get('/logout', authController.logout);
authRouter.get('/profile', authController.profile);

authRouter.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});