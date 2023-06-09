import { Repository } from 'typeorm';
import { z } from 'zod';
import { Address, RealEstate } from '../../entities';
import { inputRealEstateDataSchema, outputRealEstateDataSchema } from '../../schemas/realEstate.schemas';

type tRealEstateRepo = Repository<RealEstate>
type tAddressRepo = Repository<Address>

type tInputRealEstateData = z.infer<typeof inputRealEstateDataSchema>
type tOutputRealEstateData = z.infer<typeof outputRealEstateDataSchema>

export {
	tRealEstateRepo,
	tAddressRepo,
	tInputRealEstateData,
	tOutputRealEstateData
}