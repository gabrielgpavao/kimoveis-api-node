import { AppDataSource } from '../../data-source'
import { Address } from '../../entities'
import { AppError } from '../../errors'
import { tAddressRepo, tInputRealEstateData } from '../../interfaces/realEstates/realEstates.interfaces'
import { outputAddressDataSchema } from '../../schemas/addresses.schemas'

export async function createAddressService (realEstateData: tInputRealEstateData): Promise<Address> {
	const addressRepository: tAddressRepo = AppDataSource.getRepository(Address)
	
	const { street, number, zipCode, city, state } = realEstateData.address
	
	const findAddress = number ? await addressRepository.findOne({ where: {
		street: street,
		zipCode: zipCode,
		state: state,
		city: city,
		number: number
	}}) : await addressRepository.findOne({ where: {
		street: street,
		zipCode: zipCode,
		state: state,
		city: city
	}})
	
	if (findAddress) {
		throw new AppError('Address already exists', 409)
	}
	
	const newAddress: Address = addressRepository.create(realEstateData.address)
	
	await addressRepository.save(newAddress)

	return outputAddressDataSchema.parse(newAddress)
}