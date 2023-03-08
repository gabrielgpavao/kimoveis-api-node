import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Address } from './addresses.entity';
import { Category } from './categories.entity';
import { Schedule } from './schedules.entity';

@Entity('real_estate')
export class RealEstate {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
	value: number | string;

	@Column({ type: 'integer' })
	size: number;
	
	@CreateDateColumn({ type: 'date' })
	createdAt: Date | string;

	@UpdateDateColumn({ type: 'date' })
	updatedAt: Date | string;

	@Column({ type: 'boolean', default: false })
	sold: boolean;

	@OneToOne(() => Address)
	@JoinColumn()
	address: Address;

	@ManyToOne(() => Category, { nullable: true })
	category: Category;

	@OneToMany(() => Schedule, (schedule) => schedule.realEstate)
	schedules: Array<Schedule>;
}