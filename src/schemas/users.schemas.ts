import { hashSync } from 'bcryptjs';
import { z } from 'zod';

const inputUserDataSchema = z.object({
	name: z.string().max(45, 'String must contain at most 45 character(s)'),
	email: z.string().email('Invalid email'),
	password: z.string().max(120, 'String must contain at most 120 character(s)').transform((password) => {
		return hashSync(password, 10)
	}),
	admin: z.boolean().default(false)
})

const outputUserDataSchema = inputUserDataSchema.omit({ password: true }).extend({
	id: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullable()
})

export {
	inputUserDataSchema,
	outputUserDataSchema
}