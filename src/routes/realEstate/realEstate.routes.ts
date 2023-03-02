import { Router } from 'express';
import { createRealEstateController } from '../../controllers/realEstate/realEstate.controllers';
import { validateAdminPermissionMiddleware, validateInputDataMiddleware, validateTokenMiddleware } from '../../middlewares';
import { inputRealEstateDataSchema } from '../../schemas/realEstate.schemas';

export const realEstatesRoutes: Router = Router()

realEstatesRoutes.post('', validateTokenMiddleware, validateAdminPermissionMiddleware, validateInputDataMiddleware(inputRealEstateDataSchema), createRealEstateController)
