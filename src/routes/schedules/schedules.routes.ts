import { Router } from 'express';
import { createScheduleController } from '../../controllers/schedules/schedules.controllers';
import { validateInputDataMiddleware, validateTokenMiddleware } from '../../middlewares';
import { inputScheduleDataSchema } from '../../schemas/schedules.schemas';

export const schedulesRoutes: Router = Router()

schedulesRoutes.post('', validateTokenMiddleware, validateInputDataMiddleware(inputScheduleDataSchema), createScheduleController)
