import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      name: String,
      price: Number,
      imgSrc: String,
      qty: Number,
    },
  ],
}, { timestamps: true });


export default mongoose.model('Order', orderSchema);
