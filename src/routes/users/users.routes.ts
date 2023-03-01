import { Router } from 'express';
import { createUserController } from '../../controllers/users/users.controllers';
import { validateInputDataMiddleware, verifyEmailDuplicityMiddleware } from '../../middlewares';
import { inputUserDataSchema } from '../../schemas/users.schemas';

export const usersRoutes: Router = Router()

usersRoutes.post('', validateInputDataMiddleware(inputUserDataSchema), verifyEmailDuplicityMiddleware, createUserController)