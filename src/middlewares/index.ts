import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import { ZodTypeAny } from 'zod';
import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { AppError } from '../errors';
import { tUserRepo } from '../interfaces/users';

const validateInputDataMiddleware = (schema: ZodTypeAny) => (request: Request, response: Response, next: NextFunction): void => {
	schema.parse(request.body)

	next()
}

async function verifyEmailDuplicityMiddleware (request: Request, response: Response, next: NextFunction) {
	if (request.body.email && typeof request.body.email === 'string') {
		const userRepository: tUserRepo = AppDataSource.getRepository(User)

		const findUserByEmail: User | null = await userRepository.findOneBy({ email: request.body.email})

		if (findUserByEmail) {
			throw new AppError('Email already exists', 409)
		}
	}
	
	next()
}

export {
	validateInputDataMiddleware,
	verifyEmailDuplicityMiddleware
}