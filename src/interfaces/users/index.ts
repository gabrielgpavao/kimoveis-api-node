import { Repository } from 'typeorm';
import { z } from 'zod';
import { User } from '../../entities';
import { inputUserDataSchema, outputUserDataSchema } from '../../schemas/users.schemas';

type tUserRepo = Repository<User>

type tInputUserData = z.infer<typeof inputUserDataSchema>
type tOutputUserData = z.infer<typeof outputUserDataSchema>

export {
	tUserRepo,
	tInputUserData,
	tOutputUserData
}