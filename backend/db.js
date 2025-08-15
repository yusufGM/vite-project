import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (process.env.APPUSER && process.env.APPPASS) {
  options.user = process.env.APPUSER;
  options.pass = process.env.APPPASS;
}

mongoose.connect(process.env.MONGO_URI, options)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB connection failed, fallback to JSON data');
    console.error(err);
  });

export default mongoose;
