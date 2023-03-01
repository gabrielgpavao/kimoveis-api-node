import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { tOutputUserData, tUpdateUserData, tUserRepo } from '../../interfaces/users';
import { outputUserDataSchema } from '../../schemas/users.schemas';

export async function updateUserService (userId: number, userData: tUpdateUserData): Promise<tOutputUserData> {
	const userRepository: tUserRepo = AppDataSource.getRepository(User)
	
	const findOldUser: User | null = await userRepository.findOneBy({ id: userId})
	
	const newUser: User = userRepository.create({
		...findOldUser,
		...userData
	})
	
	await userRepository.save(newUser)

	return outputUserDataSchema.parse(newUser)
}