import mongoose from 'mongoose';
import config from 'config';

export const connect = async () => {
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
