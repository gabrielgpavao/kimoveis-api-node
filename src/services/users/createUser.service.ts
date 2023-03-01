import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { tInputUserData, tOutputUserData, tUserRepo } from '../../interfaces/users';
import { outputUserDataSchema } from '../../schemas/users.schemas';

export async function createUserService (userData: tInputUserData): Promise<tOutputUserData> {
	const userRepository: tUserRepo = AppDataSource.getRepository(User)
	
	const newUser: User = userRepository.create(userData)
	
	await userRepository.save(newUser)

	return outputUserDataSchema.parse(newUser)
}