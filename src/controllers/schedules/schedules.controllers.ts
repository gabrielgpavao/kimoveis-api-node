import { Request, Response } from 'express';
import { iCreatedScheduleResponse, tInputScheduleData } from '../../interfaces/schedules/schedules.interfaces';
import { createScheduleService } from '../../services/schedules/createSchedule.service';
import { getSchedulesService } from '../../services/schedules/getSchedules.service';

async function createScheduleController (request: Request, response: Response): Promise<Response> {
	const userId: number = request.userPermission.id
	
	const scheduleData: tInputScheduleData = request.body
	
	const newSchedule: iCreatedScheduleResponse = await createScheduleService(userId, scheduleData)
	
	return response.status(201).json(newSchedule)
}

async function getSchedulesController (request: Request, response: Response): Promise<Response> {
	const realEstateId: number = Number(request.params.id)
	
	const schedulesList = await getSchedulesService(realEstateId)
	
	return response.status(200).json(schedulesList)
}

export {
	createScheduleController,
	getSchedulesController
}
