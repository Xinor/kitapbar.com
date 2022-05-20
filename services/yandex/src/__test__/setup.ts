import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {connectionOptions} from 'config';

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri(), connectionOptions);
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
