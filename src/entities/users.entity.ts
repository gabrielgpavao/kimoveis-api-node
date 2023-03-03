import { getRounds, hashSync } from 'bcryptjs';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Schedule } from './schedules.entity';

@Entity('users')
export class User {
	@BeforeInsert()
	@BeforeUpdate()
	hashPassword () {
		const isEncrypted = getRounds(this.password)
		if (!isEncrypted) {
			this.password = hashSync(this.password, 10)
		}
	}
	
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ type: 'varchar', length: 45 })
	name: string;

	@Column({ type: 'varchar', unique: true})
	email: string;

	@Column({ type: 'varchar', length: 120 })
	password: string;

	@Column({ type: 'boolean', default: false })
	admin: boolean;

	@CreateDateColumn({ type: 'date' })
	createdAt: Date | string;

	@UpdateDateColumn({ type: 'date' })
	updatedAt: Date | string;

	@DeleteDateColumn({ type: 'date' })
	deletedAt: Date | string;

	@OneToMany(() => Schedule, (schedule) => schedule.user)
	scheduledRealEstate: Schedule 
}