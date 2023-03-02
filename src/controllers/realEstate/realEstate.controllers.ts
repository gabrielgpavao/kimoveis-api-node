import { Request, Response } from 'express';
import { tInputRealEstateData, tOutputRealEstateData } from '../../interfaces/realEstates/realEstates.interfaces';
import { createAddressService } from '../../services/realEstate/createAddress.service';
import { createRealEstateService } from '../../services/realEstate/createRealEstate.service';

async function createRealEstateController (request: Request, response: Response): Promise<Response> {
	const realEstateData: tInputRealEstateData = request.body
	
	const newRealEstate = await createRealEstateService(realEstateData)

	return response.status(201).json(newRealEstate)
}

export {
	createRealEstateController
}