import { Request, Response } from 'express';
import { tInputCategoryData, tOutputCategoryData } from '../../interfaces/categories/categories.interfaces';
import { inputCategoryDataSchema } from '../../schemas/categories.schemas';
import { createCategoriesService } from '../../services/categories/createCategories.service';

async function createCategoriesController (request: Request, response: Response): Promise<Response> {
	const categoryData: tInputCategoryData = inputCategoryDataSchema.parse(request.body)

	const newCategory: tOutputCategoryData = await createCategoriesService(categoryData)
	
	return response.status(201).json(newCategory)
}

export {
	createCategoriesController
}