import env from 'dotenv';
import { connect, set } from 'mongoose';

env.config();

set('strictQuery', false);
connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });
