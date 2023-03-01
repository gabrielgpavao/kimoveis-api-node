import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RealEstate } from './realEstates.entity';
import { User } from './users.entity';

@Entity('schedules_users_properties')
export class Schedule {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ type: 'date' })
	date: Date | string;

	@Column({ type: 'time' })
	hour: string;

	@ManyToOne(() => RealEstate)
	realEstate: RealEstate;
	
	@ManyToOne(() => User)
	user: User;
}