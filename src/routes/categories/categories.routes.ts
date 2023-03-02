import { Router } from 'express';
import { createCategoryController, getAllCategoriesController, getRealEstatesByCategoryController } from '../../controllers/categories/categories.controllers';
import { validateAdminPermissionMiddleware, validateInputDataMiddleware, validateTokenMiddleware } from '../../middlewares';
import { inputCategoryDataSchema } from '../../schemas/categories.schemas';

export const categoriesRoutes: Router = Router()

categoriesRoutes.post('', validateTokenMiddleware, validateAdminPermissionMiddleware, validateInputDataMiddleware(inputCategoryDataSchema), createCategoryController)
categoriesRoutes.get('', getAllCategoriesController)
categoriesRoutes.get('/:id/realEstate', getRealEstatesByCategoryController)
