import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import fetch from "node-fetch"; 
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: "user" },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imgSrc: String,
  description: String,
  category: String,
  isNew: Boolean,
  gender: String,
  ageGroup: String,
});

const Item = mongoose.model("Item", itemSchema);

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  username: String,
  email: String,
  address: String,
  whatsapp: String,
  items: Array,
  total: Number,
  paymentUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

const app = express();
app.use(cors());
app.use(express.json());

const dataPath = path.join(process.cwd(), 'data', 'items.json');
const isDbConnected = () => mongoose.connection.readyState === 1;

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: 'Invalid token' });
      req.userId = decoded.id;
      req.username = decoded.username;
      req.role = decoded.role;
      next();
    });
  } catch (err) {
    res.status(500).json({ error: 'Middleware error', detail: err.message });
  }
};

const adminOnly = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || decoded.role !== 'admin') return res.status(403).json({ error: 'Forbidden: Admin only' });
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    res.status(500).json({ error: 'Middleware error', detail: err.message });
  }
};

app.get('/test', (req, res) => {
  res.json({ message: 'API is running' });
});

app.get('/items', async (req, res) => {
  try {
    if (isDbConnected()) {
      const items = await Item.find();
      return res.json(items);
    }
    const rawData = fs.readFileSync(dataPath);
    const items = JSON.parse(rawData);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Gagal ambil data', detail: err.message });
  }
});

app.get('/items/:id', async (req, res) => {
  try {
    if (isDbConnected()) {
      const product = await Item.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });
      return res.json(product);
    }
    const rawData = fs.readFileSync(dataPath);
    const items = JSON.parse(rawData);
    const product = items.find(i => i._id === req.params.id);
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Gagal ambil data', detail: err.message });
  }
});

app.post('/items', adminOnly, async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json({ message: 'Produk berhasil ditambahkan', item });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menambahkan produk', detail: err.message });
  }
});

app.put('/items/:id', adminOnly, async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Produk tidak ditemukan' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Gagal update', detail: err.message });
  }
});

app.delete('/items/:id', adminOnly, async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Produk tidak ditemukan' });
    res.json({ message: 'Produk dihapus' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal hapus', detail: err.message });
  }
});

app.get('/orders', adminOnly, async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Gagal ambil orders', detail: err.message });
  }
});

app.post("/checkout", authMiddleware, async (req, res) => {
  try {
    const { address, whatsapp, items } = req.body;
    const { username, userId } = req;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Items wajib diisi dan tidak boleh kosong" });
    }

    const total = items.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);
    if (total <= 0) return res.status(400).json({ error: "Total tidak boleh 0" });

    const newOrder = new Order({
      user: userId,
      username,
      email: `${username}@example.com`,
      address,
      whatsapp,
      items,
      total,
    });
    await newOrder.save();

    const response = await fetch("https://api.xendit.co/v2/invoices", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(process.env.XENDIT_SECRET_KEY + ":").toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        external_id: `order-${Date.now()}`,
        payer_email: newOrder.email,
        amount: total,
        description: `Order oleh ${username}`,
        success_redirect_url: "http://localhost:5173/success",
        failure_redirect_url: "http://localhost:5173/failed",
      }),
    });

    const invoice = await response.json();
    if (!response.ok) throw new Error(invoice.error_message || "Gagal membuat invoice");

    newOrder.paymentUrl = invoice.invoice_url;
    await newOrder.save();

    res.json({
      paymentUrl: invoice.invoice_url,
      invoiceId: invoice.id,
      status: invoice.status,
    });
  } catch (err) {
    console.error("❌ Checkout Error:", err);
    res.status(500).json({ error: "Gagal membuat invoice", details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
