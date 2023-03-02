import { AppDataSource } from '../../data-source';
import { Category } from '../../entities';
import { AppError } from '../../errors';
import { tCategoryRepo, tInputCategoryData, tOutputCategoryData } from '../../interfaces/categories/categories.interfaces';
import { outputCategoryDataSchema } from '../../schemas/categories.schemas';

export async function createCategoriesService (categoryData: tInputCategoryData): Promise<tOutputCategoryData> {
	const categoryRepository: tCategoryRepo = AppDataSource.getRepository(Category)

	const findCategory = await categoryRepository.findOneBy({ name: categoryData.name })
	
	if (findCategory) {
		throw new AppError('Category already exists', 409)
	}

	const newCategory = categoryRepository.create(categoryData)

	await categoryRepository.save(newCategory)

	return outputCategoryDataSchema.parse(newCategory)
}