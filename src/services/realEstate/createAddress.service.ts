import { AppDataSource } from '../../data-source'
import { Address } from '../../entities'
import { tAddressRepo, tInputRealEstateData } from '../../interfaces/realEstates/realEstates.interfaces'
import { outputAddressDataSchema } from '../../schemas/addresses.schemas'

export async function createAddressService (realEstateData: tInputRealEstateData): Promise<Address> {
	const addressRepository: tAddressRepo = AppDataSource.getRepository(Address)
	
	const newAddress: Address = addressRepository.create(realEstateData.address)
	
	await addressRepository.save(newAddress)

	return outputAddressDataSchema.parse(newAddress)
}