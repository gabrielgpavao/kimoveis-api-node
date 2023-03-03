import { AppDataSource } from '../../data-source';
import { Category } from '../../entities';
import { AppError } from '../../errors';
import { tCategoryRepo, tRealEstatesByCategory } from '../../interfaces/categories/categories.interfaces';
import { realEstatesByCategorySchema } from '../../schemas/realEstate.schemas';

export async function getRealEstatesByCategoryService (categoryId: number): Promise<tRealEstatesByCategory> {
	const categoryRepository: tCategoryRepo = AppDataSource.getRepository(Category)

	const findRealEstatesByCategory: Category | null = await categoryRepository.findOne({
		where: {
			id: categoryId
		},
		relations: {
			realEstate: true
		}
	})
	
	if (!findRealEstatesByCategory) {
		throw new AppError('Category not found', 404)
	}

	return realEstatesByCategorySchema.parse(findRealEstatesByCategory)
}