export const connectionOptions = {
  // mongodb
  autoIndex: true, // https://mongoosejs.com/docs/guide.html#autoIndex
  autoCreate: true, // https://mongoosejs.com/docs/guide.html#autoCreate
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_NAME,
  // monggose
  serverSelectionTimeoutMS: 5000,
  minPoolSize: 5,
  maxPoolSize: 100
};
