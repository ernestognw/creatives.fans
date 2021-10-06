import { connection } from 'mongoose';
import users from '@db/seeds/users.json';
import supports from '@db/seeds/supports.json';
import { User, Support } from '@db/models';
import { connectDB } from '@db/scripts';
import { db } from '@config/loggers';

const seed = async () => {
  await connectDB();

  // Seed users
  db.await('🌱  Seeding users');
  await User.insertMany(users);

  // Seed supports
  db.await('🌱  Seeding supports');
  await Support.insertMany(supports);

  connection.close();
  db.success('🤟  Database seeded!');
};

seed();
