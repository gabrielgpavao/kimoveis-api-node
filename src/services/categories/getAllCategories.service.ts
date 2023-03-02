import { AppDataSource } from '../../data-source';
import { Category } from '../../entities';
import { tCategoryRepo, tOutputCategoryData } from '../../interfaces/categories/categories.interfaces';
import { categoriesListSchema } from '../../schemas/categories.schemas';

export async function getAllCategoriesService (): Promise<tOutputCategoryData[]> {
	const categoryRepository: tCategoryRepo = AppDataSource.getRepository(Category)

	const findCategory: Category[] = await categoryRepository.find()

	return categoriesListSchema.parse(findCategory)
}