import { Request, Response } from 'express';
import { loginService } from '../../services/login/login.service';

async function loginController (request: Request, response: Response): Promise<Response> {
	const token: string = await loginService(request.body)
	
	return response.status(200).json({ token: token })
}

export {
	loginController
}