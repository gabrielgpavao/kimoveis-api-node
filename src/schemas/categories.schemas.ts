import { z } from 'zod';

const inputCategoryDataSchema = z.object({
	name: z.string().max(45)
})

const outputCategoryDataSchema = inputCategoryDataSchema.extend({
	id: z.number()
})

const categoriesListSchema = outputCategoryDataSchema.array()

export {
	inputCategoryDataSchema,
	outputCategoryDataSchema,
	categoriesListSchema
}
