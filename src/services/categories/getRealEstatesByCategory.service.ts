import { AppDataSource } from '../../data-source';
import { Category, RealEstate } from '../../entities';
import { AppError } from '../../errors';
import { tCategoryRepo } from '../../interfaces/categories/categories.interfaces';
import { tRealEstateRepo } from '../../interfaces/realEstates/realEstates.interfaces';
import { realEstatesListSchema } from '../../schemas/realEstate.schemas';

export async function getRealEstatesByCategoryService (categoryId: number) {
	const categoryRepository: tCategoryRepo = AppDataSource.getRepository(Category)
	const realEstateRepository: tRealEstateRepo = AppDataSource.getRepository(RealEstate)

	const findCategory: Category | null = await categoryRepository.findOneBy({ id: categoryId })

	if (!findCategory) {
		throw new AppError('Category not found', 404)
	}
	
	const findRealEstates: RealEstate[] = await realEstateRepository.find({
		relations: {
			category: true
		}
	})
	
	return realEstatesListSchema.parse(findRealEstates)
}