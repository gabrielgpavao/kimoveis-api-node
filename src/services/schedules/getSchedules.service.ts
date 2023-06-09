import { AppDataSource } from '../../data-source';
import { RealEstate } from '../../entities';
import { AppError } from '../../errors';
import { tRealEstateRepo } from '../../interfaces/realEstates/realEstates.interfaces';

export async function getSchedulesService (realEstateId: number) {
	const realEstateRepository: tRealEstateRepo = AppDataSource.getRepository(RealEstate)	

	const findRealEstate = await realEstateRepository.findOneBy({ id: realEstateId })

	if (!findRealEstate) {
		throw new AppError('RealEstate not found', 404)
	}
	
	const findSchedules = realEstateRepository.createQueryBuilder('real_estate')
		.innerJoinAndSelect('real_estate.category', 'category')
		.innerJoinAndSelect('real_estate.address', 'address')
		.innerJoinAndSelect('real_estate.schedules', 'schedule')
		.innerJoinAndSelect('schedule.user', 'user')
		.where('schedule."realEstateId" = :id', { id: realEstateId })
		.getOne()
	
	return findSchedules
}
