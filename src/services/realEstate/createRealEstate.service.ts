import { AppDataSource } from '../../data-source';
import { Address, Category, RealEstate } from '../../entities';
import { AppError } from '../../errors';
import { tCategoryRepo } from '../../interfaces/categories/categories.interfaces';
import { tRealEstateRepo, tInputRealEstateData, tOutputRealEstateData, tAddressRepo, tRealEstateWithAddressId } from '../../interfaces/realEstates/realEstates.interfaces';
import { outputRealEstateDataSchema } from '../../schemas/realEstate.schemas';
import { createAddressService } from './createAddress.service';

export async function createRealEstateService (realEstateData: tInputRealEstateData): Promise<any> {
	const createdAddress: Address = await createAddressService(realEstateData)

	const categoryRepository: tCategoryRepo = AppDataSource.getRepository(Category)
	const realEstateRepository: tRealEstateRepo = AppDataSource.getRepository(RealEstate)

	const findCategory: Category | null = await categoryRepository.findOneBy({ id: realEstateData.categoryId })

	if (!findCategory) {
		throw new AppError('Category not found', 404)
	}
	
	const newRealEstate: RealEstate = realEstateRepository.create({
		...realEstateData,
		address: createdAddress,
		category: findCategory
	})

	await realEstateRepository.save(newRealEstate)

	

	return outputRealEstateDataSchema.parse(newRealEstate)
}
