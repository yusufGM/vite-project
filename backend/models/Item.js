import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
});

const Item = mongoose.model('Item', itemSchema);
export default Item;
