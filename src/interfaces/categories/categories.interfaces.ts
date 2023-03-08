import { Repository } from 'typeorm';
import { z } from 'zod';
import { Category } from '../../entities';
import { inputCategoryDataSchema, outputCategoryDataSchema } from '../../schemas/categories.schemas';
import { realEstatesByCategorySchema } from '../../schemas/realEstate.schemas';

type tCategoryRepo = Repository<Category>

type tInputCategoryData = z.infer<typeof inputCategoryDataSchema>
type tOutputCategoryData = z.infer<typeof outputCategoryDataSchema>

type tRealEstatesByCategory = z.infer<typeof realEstatesByCategorySchema>

export {
	tCategoryRepo,
	tInputCategoryData,
	tOutputCategoryData,
	tRealEstatesByCategory
}