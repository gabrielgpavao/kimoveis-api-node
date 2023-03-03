import { z } from 'zod';

const inputScheduleDataSchema = z.object({
	date: z.string().refine((date: string) => {
		const dateRegex: RegExp = /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/
		return dateRegex.test(date)

	}, { message: 'Invalid date, date format is YYYY/DD/MM' }).refine((date: any) => {
		date = date.split('/')
		const handleDate = new Date(date[0], date[2] - 1, date[1])
		const dateDay = handleDate.getDay()
		
		return dateDay >= 1 && dateDay <= 5
	}, { message: 'Invalid date, work days are monday to friday'}),

	hour: z.string().refine((hour: string) => {
		const hourRegex: RegExp = /^(0[8-9]|1[0-7]):[0-5][0-9]$/
		return hourRegex.test(hour)
	}, { message: `Invalid hour, available times are 8AM to 18PM` }),

	realEstateId: z.number().int()
})

export {
	inputScheduleDataSchema
}