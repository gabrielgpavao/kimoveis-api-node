import { Request, Response } from 'express';
import { tInputRealEstateData, tOutputRealEstateData } from '../../interfaces/realEstates/realEstates.interfaces';
import { createRealEstateService } from '../../services/realEstate/createRealEstate.service';
import { getRealEstatesService } from '../../services/realEstate/getRealEstates.service';

async function createRealEstateController (request: Request, response: Response): Promise<Response> {
	const realEstateData: tInputRealEstateData = request.body
	
	const newRealEstate = await createRealEstateService(realEstateData)

	return response.status(201).json(newRealEstate)
}

async function getRealEstatesController (request: Request, response: Response): Promise<Response> {
	const realEstateList: Array<tOutputRealEstateData> = await getRealEstatesService()
	
	return response.status(200).json(realEstateList)
}

export {
	createRealEstateController,
	getRealEstatesController
}