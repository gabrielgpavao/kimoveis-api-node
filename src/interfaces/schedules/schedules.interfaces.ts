import { Repository } from 'typeorm';
import { z } from 'zod';
import { Schedule } from '../../entities';
import { inputScheduleDataSchema } from '../../schemas/schedules.schemas';

type tScheduleRepo = Repository<Schedule>

type tInputScheduleData = z.infer<typeof inputScheduleDataSchema>

interface iCreatedScheduleResponse {
	message: string;
}

export {
	tScheduleRepo,
	tInputScheduleData,
	iCreatedScheduleResponse
}