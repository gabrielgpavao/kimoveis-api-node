import { Request, Response } from 'express';
import { iCreatedScheduleResponse, tInputScheduleData } from '../../interfaces/schedules/schedules.interfaces';
import { createScheduleService } from '../../services/schedules/createSchedule.service';

async function createScheduleController (request: Request, response: Response): Promise<Response> {
	const userId: number = request.userPermission.id
	
	const scheduleData: tInputScheduleData = request.body
	
	const newSchedule: iCreatedScheduleResponse = await createScheduleService(userId, scheduleData)
	
	return response.status(201).json(newSchedule)
}

export {
	createScheduleController
}