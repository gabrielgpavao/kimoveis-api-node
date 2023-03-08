import { z } from 'zod';
import { inputAddressDataSchema, outputAddressDataSchema } from './addresses.schemas';
import { outputCategoryDataSchema } from './categories.schemas';

const inputRealEstateDataSchema = z.object({
	value: z.number().min(-9999999999.99).max(9999999999.99).or(z.string()),
	size: z.number().int().positive(),
	address: inputAddressDataSchema,
	categoryId: z.number()
})

const outputRealEstateDataSchema = inputRealEstateDataSchema.omit({ categoryId: true }).extend({
	id: z.number(),
	address: outputAddressDataSchema,
	category: outputCategoryDataSchema,
	sold: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string()
})

const realEstatesListSchema = z.array(outputRealEstateDataSchema.omit({ address: true, category: true }))

const realEstatesByCategorySchema = outputCategoryDataSchema.extend({
	realEstate: realEstatesListSchema
})

export {
	inputRealEstateDataSchema,
	outputRealEstateDataSchema,
	realEstatesListSchema,
	realEstatesByCategorySchema
}