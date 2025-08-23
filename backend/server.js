import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

import mongoose from './db.js';
import Item from './models/Item.js';
import User from './models/User.js';
import Order from './models/Order.js';

dotenv.config();

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
      if (err) {
        console.error("JWT Verify Error:", err);
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.userId = decoded.id;
      req.role = decoded.role;
      next();
    });
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(500).json({ error: 'Middleware error', detail: err.message });
  }
};

const adminOnly = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1]; // ambil token setelah "Bearer"
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || decoded.role !== 'admin') {
        console.error("Admin Verify Error:", err || "Not admin role");
        return res.status(403).json({ error: 'Forbidden: Admin only' });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    console.error("Admin Middleware Error:", err);
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
    return res.json(items);
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
    return res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Gagal ambil data', detail: err.message });
  }
});

app.post('/items', adminOnly, async (req, res) => {
  try {
    const { name, imgSrc, price, description, category, isNew, gender, ageGroup } = req.body;
    const item = new Item({ name, imgSrc, price, description, category, isNew, gender, ageGroup });
    await item.save();
    res.status(201).json({ message: 'Produk berhasil ditambahkan', item });
  } catch (err) {
    console.error("POST /items Error:", err);
    res.status(500).json({ error: 'Gagal menambahkan produk', detail: err.message });
  }
});

app.put('/items/:id', adminOnly, async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!updated) return res.status(404).json({ error: 'Produk tidak ditemukan' });
    res.json(updated);
  } catch (err) {
    console.error("PUT /items/:id Error:", err);
    res.status(500).json({ error: 'Gagal update', detail: err.message });
  }
});

app.delete('/items/:id', adminOnly,  async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if(!deleted) return res.status(404).json({ error: 'Produk tidak ditemukan' });
    res.json({ message: 'Produk dihapus' });
  } catch (err) {
    console.error("DELETE /items/:id Error:", err);
    res.status(500).json({ error: 'Gagal hapus', detail: err.message });
  }
});

app.get('/orders', adminOnly, async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error("GET /orders Error:", err);
    res.status(500).json({ error: 'Gagal ambil orders', detail: err.message });
  }
});

app.post('/checkout', authMiddleware, async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.userId;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart kosong' });
    }

    const newOrder = new Order({ userId, items });
    await newOrder.save();

    res.json({ message: 'Checkout berhasil' });
  } catch (err) {
    console.error("POST /checkout Error:", err);
    res.status(500).json({ error: 'Server error', detail: err.message });
  }
});

app.post('/signup', async (req, res) => {
  try {
    const { username, password, role = 'user' } = req.body;

    if (!username || !password)
      return res.status(400).json({ error: 'Username dan password harus diisi' });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ error: 'Username sudah digunakan' });

    const newUser = new User({ username, password, role });
    await newUser.save();

    return res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error("POST /signup Error:", err);
    res.status(500).json({ error: 'Server error', detail: err.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'User not found' });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (err) {
    console.error("POST /login Error:", err);
    res.status(500).json({ error: 'Server error', detail: err.message });
  }
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));