import mongoose from 'mongoose';
import {connectionOptions} from 'config';

const DB_URL = process.env.NODE_ENV === 'production' ? `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}` : 'mongodb://localhost:8001';

mongoose.connect(DB_URL, connectionOptions)
  .then(() => console.log('connected to mongodb'))
  .catch((err) => console.log(`mongodb initial connection err: ${err.message}`))

mongoose.connection.on('disconnected', () => {
  console.log('mongodb connection lost!');
});

mongoose.connection.on('error', err => {
  console.log(`mongodb connection err: ${err}`);
});

mongoose.connection.on('reconnected', () => {
  console.log('reconnected to mongodb!');
});

export default mongoose.connection;
