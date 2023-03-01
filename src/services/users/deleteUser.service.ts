import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { tUserRepo } from '../../interfaces/users';

export async function deleteUserService (userId: number) {
	const userRepository: tUserRepo = AppDataSource.getRepository(User)
	
	const user: User | null = await userRepository.findOneBy({ id: userId })
	
	await userRepository.softRemove(user!)
}