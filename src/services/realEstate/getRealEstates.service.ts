import { AppDataSource } from '../../data-source';
import { RealEstate } from '../../entities';
import { tRealEstateRepo } from '../../interfaces/realEstates/realEstates.interfaces';

export async function getRealEstatesService (): Promise<any> {
	const realEstateRepository: tRealEstateRepo = AppDataSource.getRepository(RealEstate)

	const findRealEstates: RealEstate[] = await realEstateRepository.find({
		relations: {
			address: true
		}
	})
	
	return findRealEstates
}
