import { Request, Response } from 'express'
import { tOutputUserData } from '../../interfaces/users'
import { createUserService } from '../../services/users/createUser.service'
import { deleteUserService } from '../../services/users/deleteUser.service'
import { getAllUsersService } from '../../services/users/getAllUsers.service'
import { updateUserService } from '../../services/users/updateUser.service'

async function createUserController (request: Request, response: Response): Promise<Response> {
	const newUser = await createUserService(request.body)
	
	return response.status(201).json(newUser)
}

async function getAllUsersController (request: Request, response: Response): Promise<Response> {
	const userList: Array<tOutputUserData> = await getAllUsersService()
	
	return response.status(200).json(userList)
}

async function updateUserController (request: Request, response: Response): Promise<Response> {
	const userId: number = Number(request.params.id)

	const updatedUser = await updateUserService(userId, request.body)
	
	return response.status(200).json(updatedUser)
}

async function deleteUserController (request: Request, response: Response): Promise<Response> {
	const userId: number = Number(request.params.id)
	
	await deleteUserService(userId)
	
	return response.status(204).json()
}

export {
	createUserController,
	getAllUsersController,
	updateUserController,
	deleteUserController
}