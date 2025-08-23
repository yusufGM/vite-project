import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgSrc: { type: String, required: true }, 
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  isNew: { type: Boolean, default: false },
  gender: { type: String },
  ageGroup: { type: String }
});

export default mongoose.model('Item', itemSchema);