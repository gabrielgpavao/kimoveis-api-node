import { Request, Response } from 'express'
import { tOutputUserData } from '../../interfaces/users'
import { createUserService } from '../../services/users/createUser.service'
import { getAllUsersService } from '../../services/users/getAllUsers.service'

async function createUserController (request: Request, response: Response): Promise<Response> {
	const newUser = await createUserService(request.body)
	
	return response.status(201).json(newUser)
}

async function getAllUsersController (request: Request, response: Response): Promise<Response> {
	const userList: Array<tOutputUserData> = await getAllUsersService()
	
	return response.status(200).json(userList)
}

export {
	createUserController,
	getAllUsersController
}