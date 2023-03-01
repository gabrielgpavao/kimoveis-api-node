import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Schedule } from './schedules.entity';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ type: 'varchar', length: 45, unique: true })
	name: string;

	@Column({ type: 'varchar', unique: true})
	email: string;

	@Column({ type: 'varchar', length: 120 })
	password: string;

	@Column({ type: 'boolean', default: false })
	admin: boolean;

	@CreateDateColumn({ type: 'datetime' })
	createdAt: Date | string;

	@UpdateDateColumn({ type: 'datetime' })
	updatedAt: Date | string;

	@DeleteDateColumn({ type: 'datetime' })
	deletedAt: Date | string;

	@OneToMany(() => Schedule, (schedule) => schedule.user)
	scheduledRealEstate: Schedule 
}