import { z } from 'zod';
import { outputAdressDataSchema } from './addresses.schemas';

const inputRealEstateDataSchema = z.object({
	value: z.number().min(-9999999999.99).max(9999999999.99),
	size: z.number().int(),
	adress: outputAdressDataSchema,
	categoryId: z.number()
})

const outputRealEstateDataSchema = inputRealEstateDataSchema.extend({
	id: z.number()
})

const realEstatesListSchema = outputRealEstateDataSchema.array()

export {
	inputRealEstateDataSchema,
	outputRealEstateDataSchema,
	realEstatesListSchema
}