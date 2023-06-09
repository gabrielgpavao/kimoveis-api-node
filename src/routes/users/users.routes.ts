import { Router } from 'express';
import { createUserController, deleteUserController, getAllUsersController, updateUserController } from '../../controllers/users/users.controllers';
import { validateAdminPermissionMiddleware, validateInputDataMiddleware, validateTokenMiddleware, validateUserIdMiddleware, verifyEmailDuplicityMiddleware } from '../../middlewares';
import { inputUserDataSchema, updateUserDataSchema } from '../../schemas/users.schemas';

export const usersRoutes: Router = Router()

usersRoutes.post('', validateInputDataMiddleware(inputUserDataSchema), verifyEmailDuplicityMiddleware, createUserController)
usersRoutes.get('', validateTokenMiddleware, validateAdminPermissionMiddleware, getAllUsersController)
usersRoutes.patch('/:id', validateUserIdMiddleware, validateTokenMiddleware, validateAdminPermissionMiddleware, validateInputDataMiddleware(updateUserDataSchema), verifyEmailDuplicityMiddleware, updateUserController)
usersRoutes.delete('/:id', validateUserIdMiddleware, validateTokenMiddleware, validateAdminPermissionMiddleware, deleteUserController)
