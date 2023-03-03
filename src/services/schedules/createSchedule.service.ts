import { AppDataSource } from '../../data-source';
import { RealEstate, Schedule, User } from '../../entities';
import { AppError } from '../../errors';
import { tRealEstateRepo } from '../../interfaces/realEstates/realEstates.interfaces';
import { iCreatedScheduleResponse, tInputScheduleData, tScheduleRepo } from '../../interfaces/schedules/schedules.interfaces';
import { tUserRepo } from '../../interfaces/users/users.interfaces';

export async function createScheduleService (userId: number, scheduleData: tInputScheduleData): Promise<iCreatedScheduleResponse> {
	const scheduleRepository: tScheduleRepo = AppDataSource.getRepository(Schedule)
	const realEstateRepository: tRealEstateRepo = AppDataSource.getRepository(RealEstate)
	const userRepository: tUserRepo = AppDataSource.getRepository(User)

	const findRealEstate: RealEstate | null = await realEstateRepository.findOneBy({ id: scheduleData.realEstateId })
	if (!findRealEstate) {
		throw new AppError('RealEstate not found', 404)
	}
	
	const userAlreadyScheduled: Schedule | null = await scheduleRepository.createQueryBuilder('schedule')
		.where('schedule.date = :date', { date: scheduleData.date })
		.andWhere('schedule.hour = :hour', { hour: scheduleData.hour })
		.andWhere('schedule."userId" = :userId', { userId })
		.getOne()

	if (userAlreadyScheduled) {
		throw new AppError('User schedule to this real estate at this date and time already exists', 409)
	}

	const alreadyScheduled: Schedule | null = await scheduleRepository.createQueryBuilder('schedule')
		.where('schedule.date = :date', { date: scheduleData.date })
		.andWhere('schedule.hour = :hour', { hour: scheduleData.hour })
		.getOne()
		
	if (alreadyScheduled) {
		throw new AppError('Schedule to this real estate at this date and time already exists', 409)
	}
		
		
	const user: User | null = await userRepository.findOneBy({ id: userId })
	
	const newSchedule = scheduleRepository.create({
		...scheduleData,
		realEstate: findRealEstate,
		user: user!
	})
	await scheduleRepository.save(newSchedule)
	
	return {
		message: 'Schedule created'
	}
}
