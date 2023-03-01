import { Router } from 'express';
import { createUserController, getAllUsersController } from '../../controllers/users/users.controllers';
import { validateAdminPermissionMiddleware, validateInputDataMiddleware, validateTokenMiddleware, verifyEmailDuplicityMiddleware } from '../../middlewares';
import { inputUserDataSchema } from '../../schemas/users.schemas';

export const usersRoutes: Router = Router()

usersRoutes.post('', validateInputDataMiddleware(inputUserDataSchema), verifyEmailDuplicityMiddleware, createUserController)
usersRoutes.get('', validateTokenMiddleware, validateAdminPermissionMiddleware, getAllUsersController)
