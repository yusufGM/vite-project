import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      _id: String,
      name: String,
      price: Number,
      imgSrc: String,
      qty: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
