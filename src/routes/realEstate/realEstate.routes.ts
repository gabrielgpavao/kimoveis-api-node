import { Router } from 'express';
import { createRealEstateController, getRealEstatesController } from '../../controllers/realEstate/realEstate.controllers';
import { validateAdminPermissionMiddleware, validateInputDataMiddleware, validateTokenMiddleware, verifyDuplicityAddressMiddleware } from '../../middlewares';
import { inputRealEstateDataSchema } from '../../schemas/realEstate.schemas';

export const realEstatesRoutes: Router = Router()

realEstatesRoutes.post('', validateTokenMiddleware, validateAdminPermissionMiddleware, validateInputDataMiddleware(inputRealEstateDataSchema), verifyDuplicityAddressMiddleware, createRealEstateController)
realEstatesRoutes.get('', getRealEstatesController)