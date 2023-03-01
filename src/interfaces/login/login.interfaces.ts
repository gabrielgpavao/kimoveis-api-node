import { z } from 'zod';
import { loginSchema } from '../../schemas/login.schemas';

type tInputLoginData = z.infer<typeof loginSchema>

export {
	tInputLoginData
}