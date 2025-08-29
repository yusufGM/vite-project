import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  address: String,
  email: String,
  username: String,
  whatsapp: String,
  total: Number,
  status: { type: String, default: "PENDING" },
  paymentUrl: String,
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
