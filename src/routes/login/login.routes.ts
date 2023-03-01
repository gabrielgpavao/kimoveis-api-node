import { Router } from 'express';
import { loginController } from '../../controllers/login/login.controllers';
import { validateInputDataMiddleware } from '../../middlewares';
import { loginSchema } from '../../schemas/login.schemas';

export const loginRoutes: Router = Router()

loginRoutes.post('', validateInputDataMiddleware(loginSchema), loginController)
