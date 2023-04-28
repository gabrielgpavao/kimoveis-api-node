import { Repository } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import {
  Address,
  Category,
  RealEstate,
  Schedule,
  User,
} from '../../../entities';

type iRealEstateRepo = Repository<RealEstate>;
type iAddressRepo = Repository<Address>;
type iUserRepo = Repository<User>;
type iCategoryRepo = Repository<Category>;
type iScheduleRepo = Repository<Schedule>;

const manySchedules = async () => {
  const realEstateRepo: iRealEstateRepo = AppDataSource.getRepository(RealEstate);
  const addressRepo: iAddressRepo = AppDataSource.getRepository(Address);
  const userRepo: iUserRepo = AppDataSource.getRepository(User);
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category);
  const scheduleRepo: iScheduleRepo = AppDataSource.getRepository(Schedule);

  const userAdmin = userRepo.create({
    name: 'admin',
    email: 'admin@mail.com',
    password: '1234',
    admin: true,
  });

  
  const userNotAdmin = userRepo.create({
    name: 'user',
    email: 'user@mail.com',
    password: '1234',
  });


  await userRepo.save([userAdmin, userNotAdmin]);

  const handleUserAdmin = {
	id: userAdmin.id,
	name: userAdmin.name,
	email: userAdmin.email,
	admin: userAdmin.admin,
	createdAt: userAdmin.createdAt,
	updatedAt: userAdmin.updatedAt,
	deletedAt: userAdmin.deletedAt
  }
  const handleUserNotAdmin = {
	id: userNotAdmin.id,
	name: userNotAdmin.name,
	email: userNotAdmin.email,
	admin: userNotAdmin.admin,
	createdAt: userNotAdmin.createdAt,
	updatedAt: userNotAdmin.updatedAt,
	deletedAt: userNotAdmin.deletedAt
  }

  const category = await categoryRepo.save({ name: 'Apartamento' });
  const address = await addressRepo.save({
    city: 'São Paulo',
    street: 'Rua das Rosas',
    state: 'SP',
    zipCode: '0000011',
  });

  const realEstate = await realEstateRepo.save({
    value: 1000000.0,
    size: 440,
    address,
    category,
  });

  const schedule1 = await scheduleRepo.save({
    realEstate,
    user: userAdmin,
    date: '2022-03-01',
    hour: '12:30:00',
  });
  const schedule2 = await scheduleRepo.save({
    realEstate,
    user: userNotAdmin,
    date: '2022-03-01',
    hour: '13:30:00',
  });

  return {
    ...realEstate,
    schedules: [
      {
        ...{ id: schedule1.id, date: schedule1.date, hour: schedule1.hour },
        user: { ...handleUserAdmin },
      },
      {
        ...{ id: schedule2.id, date: schedule2.date, hour: schedule2.hour },
        user: { ...handleUserNotAdmin },
      },
    ],
    address,
    category,
  };
};

export default { manySchedules };
