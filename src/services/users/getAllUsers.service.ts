import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { tOutputUserData, tUserRepo } from '../../interfaces/users/users.interfaces'
import { usersListSchema } from '../../schemas/users.schemas'

export async function getAllUsersService (): Promise<tOutputUserData[]> {
	const userRepository: tUserRepo = AppDataSource.getRepository(User)

	const usersList: User[] = await userRepository.find({})

	return usersListSchema.parse(usersList)
}