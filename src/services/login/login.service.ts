import { compare } from 'bcryptjs';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { AppError } from '../../errors';
import { tInputLoginData } from '../../interfaces/login/login.interfaces';
import { tOutputUserData, tUserRepo } from '../../interfaces/users/users.interfaces';
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export async function loginService (userData: tInputLoginData): Promise<string> {
	const userRepository: tUserRepo = AppDataSource.getRepository(User)
	
	const findUser: User | null = await userRepository.findOneBy({ email: userData.email })

	if (!findUser) {
		throw new AppError('Invalid credentials', 401)
	}
	
	const validPassword: boolean = await compare(userData.password, findUser.password)
	
	if (!validPassword) {
		throw new AppError('Invalid credentials', 401)
	}

	const token: string = jwt.sign({
		admin: findUser.admin
	}, process.env.SECRET_KEY!, {
		expiresIn: process.env.EXPIRES_IN,
		subject: findUser.id.toString()
	})
	
	return token
}