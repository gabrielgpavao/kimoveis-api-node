import { Request, Response } from 'express'
import { createUserService } from '../../services/users/createUser.service'

async function createUserController (request: Request, response: Response): Promise<Response> {
	const newUser = await createUserService(request.body)
	
	return response.status(201).json(newUser)
}

export {
	createUserController
}