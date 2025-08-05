// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.appuser,
  pass: process.env.Appuser123,
};

mongoose.connect(process.env.MONGO_URI, options)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
