import { Request, Response } from 'express';
import { sendEmail } from '../../nodemailer.util';
import { inputEmailDataSchema } from '../../schemas/email.schemas';

export async function sendEmailController (request: Request, response: Response): Promise<Response> {
	const emailData = inputEmailDataSchema.parse(request.body)
	
	sendEmail(emailData)
	
	return response.status(200).json({ message: 'Email sent with success'})
}
