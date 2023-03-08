import { Router } from 'express';
import { createScheduleController, getSchedulesController } from '../../controllers/schedules/schedules.controllers';
import { validateAdminPermissionMiddleware, validateInputDataMiddleware, validateTokenMiddleware } from '../../middlewares';
import { inputScheduleDataSchema } from '../../schemas/schedules.schemas';

export const schedulesRoutes: Router = Router()

schedulesRoutes.post('', validateTokenMiddleware, validateInputDataMiddleware(inputScheduleDataSchema), createScheduleController)
schedulesRoutes.get('/realEstate/:id', validateTokenMiddleware, validateAdminPermissionMiddleware, getSchedulesController)
