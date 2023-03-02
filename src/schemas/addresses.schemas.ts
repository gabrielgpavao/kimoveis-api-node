import { z } from 'zod';

const inputAdressDataSchema = z.object({
	street: z.string().max(45),
	zipCode: z.string().max(8),
	number: z.string().nullish(),
	city: z.string().max(20),
	state: z.string().max(2)
})

const outputAdressDataSchema = inputAdressDataSchema.extend({
	id: z.number()
})

export {
	inputAdressDataSchema, 
	outputAdressDataSchema
}