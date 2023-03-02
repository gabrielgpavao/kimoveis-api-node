import { Repository } from 'typeorm';
import { z } from 'zod';
import { Category } from '../../entities';
import { inputCategoryDataSchema, outputCategoryDataSchema } from '../../schemas/categories.schemas';

type tCategoryRepo = Repository<Category>

type tInputCategoryData = z.infer<typeof inputCategoryDataSchema>
type tOutputCategoryData = z.infer<typeof outputCategoryDataSchema>

export {
	tCategoryRepo,
	tInputCategoryData,
	tOutputCategoryData
}