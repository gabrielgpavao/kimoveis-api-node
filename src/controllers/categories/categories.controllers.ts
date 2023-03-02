import { Request, Response } from 'express';
import { tInputCategoryData, tOutputCategoryData } from '../../interfaces/categories/categories.interfaces';
import { inputCategoryDataSchema } from '../../schemas/categories.schemas';
import { createCategoriesService } from '../../services/categories/createCategories.service';
import { getAllCategoriesService } from '../../services/categories/getAllCategories.service';
import { getRealEstatesByCategoryService } from '../../services/categories/getRealEstatesByCategory.service';

async function createCategoryController (request: Request, response: Response): Promise<Response> {
	const categoryData: tInputCategoryData = inputCategoryDataSchema.parse(request.body)

	const newCategory: tOutputCategoryData = await createCategoriesService(categoryData)
	
	return response.status(201).json(newCategory)
}

async function getAllCategoriesController (request: Request, response: Response): Promise<Response> {
	const categoriesList = await getAllCategoriesService()
	
	return response.status(200).json(categoriesList)
}

async function getRealEstatesByCategoryController (request: Request, response: Response): Promise<Response> {
	const categoryId: number = Number(request.params.id)
	
	const realEstatesList = await getRealEstatesByCategoryService(categoryId)
	
	return response.status(200).json(realEstatesList)
}

export {
	createCategoryController,
	getAllCategoriesController,
	getRealEstatesByCategoryController
}