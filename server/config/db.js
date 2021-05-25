import mongoose from 'mongoose';
import config from 'config';

<<<<<<< HEAD
export const connect = async () => {
=======
export const connsec = async () => {
>>>>>>> server
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
