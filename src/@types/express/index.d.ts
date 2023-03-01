import * as Express from 'express'

declare global {
	namespace Express {
		interface Request {
			userPermission: {
				id: number;
				admin: boolean;
			}
		}
	}
}
