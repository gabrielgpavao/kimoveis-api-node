import { Router } from 'express';
import { sendEmailController } from '../../controllers/email/email.controller';
import { createTransport } from 'nodemailer';
import { AppError } from '../../errors';
// import { iEmailBodyRequest } from './interfaces/email/email.interfaces';
import 'dotenv/config'

export const emailRoutes: Router = Router()

emailRoutes.post('', sendEmailController)
