import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export class AppError extends Error {
	message: string
	statusCode: number

	constructor(message: string, statusCode: number = 400) {
		super()
		this.message = message
		this.statusCode = statusCode
	}
}

export function handleErros (error: Error, request: Request, response: Response, next: NextFunction): Response {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({message: error.message})

	} else if (error instanceof ZodError) {		
		const invalidDate: boolean = Object.keys(error.flatten().fieldErrors).includes('date')
		const invalidHour: boolean = Object.keys(error.flatten().fieldErrors).includes('hour')
		if (invalidDate && error.errors[0].code === 'custom') {
			return response.status(400).json({ message: error.flatten().fieldErrors.date?.join() })
			
		} else if (invalidHour && error.errors[0].code === 'custom') {
			return response.status(400).json({ message: error.flatten().fieldErrors.hour?.join() })

		}
		
		return response.status(400).json({message: error.flatten().fieldErrors})
		
	}
	
	console.log(error)
    return response.status(500).json({message: 'Internal server error'})
}