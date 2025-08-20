
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },      
  image: { type: String, required: true },      
  price: { type: Number, required: true },
  description: { type: String },
});

export default mongoose.model('Item', itemSchema);
