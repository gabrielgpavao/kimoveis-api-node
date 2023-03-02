import { Request, Response } from 'express';
import { tInputCategoryData, tOutputCategoryData } from '../../interfaces/categories/categories.interfaces';
import { inputCategoryDataSchema } from '../../schemas/categories.schemas';
import { createCategoriesService } from '../../services/categories/createCategories.service';
import { getAllCategoriesService } from '../../services/categories/getAllCategories.service';

async function createCategoryController (request: Request, response: Response): Promise<Response> {
	const categoryData: tInputCategoryData = inputCategoryDataSchema.parse(request.body)

	const newCategory: tOutputCategoryData = await createCategoriesService(categoryData)
	
	return response.status(201).json(newCategory)
}

async function getAllCategoriesController (request: Request, response: Response): Promise<Response> {
	const categoriesList = await getAllCategoriesService()
	
	return response.status(200).json(categoriesList)
}

export {
	createCategoryController,
	getAllCategoriesController
}