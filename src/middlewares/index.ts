import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import { ZodTypeAny } from 'zod';
import { AppDataSource } from '../data-source';
import { Address, User } from '../entities';
import { AppError } from '../errors';
import { tUserRepo } from '../interfaces/users/users.interfaces';
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { tAddressRepo } from '../interfaces/realEstates/realEstates.interfaces';

const validateInputDataMiddleware = (schema: ZodTypeAny) => (request: Request, response: Response, next: NextFunction): void => {
	request.body = schema.parse(request.body)

	next()
}

async function verifyEmailDuplicityMiddleware (request: Request, response: Response, next: NextFunction): Promise<void> {
	if (request.body.email && typeof request.body.email === 'string') {
		const userRepository: tUserRepo = AppDataSource.getRepository(User)

		const findUserByEmail: User | null = await userRepository.findOneBy({ email: request.body.email})

		if (findUserByEmail) {
			throw new AppError('Email already exists', 409)
		}
	}
	
	next()
}

function validateTokenMiddleware (request: Request, response: Response, next: NextFunction): void {
	const token: string | undefined = request.headers.authorization?.split(' ')[1] || undefined

	if (!token) {
		throw new AppError('Missing bearer token', 401)
	}

	jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
		if (error) {
			throw new AppError(error.message, 401)
		}

		request.userPermission = {
			id: Number(decoded.sub),
			admin: decoded.admin
		}
	})

	next()
}

function validateAdminPermissionMiddleware (request: Request, response: Response, next: NextFunction): void {
	const isAdmin: boolean = request.userPermission.admin

	if (request.baseUrl === '/categories' && !isAdmin) {
		throw new AppError('Insufficient permission', 403)
	}

	if (request.baseUrl === '/realEstate' && !isAdmin) {
		throw new AppError('Insufficient permission', 403)
	}
	
	if (request.method === 'GET' || request.method === 'DELETE') {
		if (!isAdmin) {
			throw new AppError('Insufficient permission', 403)
		}

	} else if (request.method === 'PATCH') {
		if (Number(request.params.id) !== request.userPermission.id && !isAdmin) {
			throw new AppError('Insufficient permission', 403)
		}
	}
	
	next()
}

async function validateUserIdMiddleware (request: Request, response: Response, next: NextFunction): Promise<void> {
	const userRepository: tUserRepo = AppDataSource.getRepository(User)

	const findUserId: User | null = await userRepository.findOneBy({ id: Number(request.params.id) })

	if (!findUserId) {
		throw new AppError('User not found', 404)
	}	

	next()
}

async function verifyDuplicityAddressMiddleware (request: Request, response: Response, next: NextFunction): Promise<void> {
	const addressRepository: tAddressRepo = AppDataSource.getRepository(Address)
	
	const { street, number, zipCode, city, state } = request.body.address
	
	const findAddress = number ? await addressRepository.findOne({ where: {
		street: street,
		zipCode: zipCode,
		state: state,
		city: city,
		number: number
	}}) : await addressRepository.findOne({ where: {
		street: street,
		zipCode: zipCode,
		state: state,
		city: city
	}})
	
	console.log(request.body)
	
	if (findAddress) {
		throw new AppError('Address already exists', 409)
	}

	next()
}

export {
	validateInputDataMiddleware,
	verifyEmailDuplicityMiddleware,
	validateTokenMiddleware,
	validateAdminPermissionMiddleware,
	validateUserIdMiddleware,
	verifyDuplicityAddressMiddleware
}