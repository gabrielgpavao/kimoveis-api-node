import { Router } from 'express';
import { createUserController, getAllUsersController, updateUserController } from '../../controllers/users/users.controllers';
import { validateAdminPermissionMiddleware, validateInputDataMiddleware, validateTokenMiddleware, validateUserId, verifyEmailDuplicityMiddleware } from '../../middlewares';
import { inputUserDataSchema, updateUserDataSchema } from '../../schemas/users.schemas';

export const usersRoutes: Router = Router()

usersRoutes.post('', validateInputDataMiddleware(inputUserDataSchema), verifyEmailDuplicityMiddleware, createUserController)
usersRoutes.get('', validateTokenMiddleware, validateAdminPermissionMiddleware, getAllUsersController)
usersRoutes.patch('/:id', validateUserId, validateTokenMiddleware, validateAdminPermissionMiddleware, validateInputDataMiddleware(updateUserDataSchema), verifyEmailDuplicityMiddleware, updateUserController)