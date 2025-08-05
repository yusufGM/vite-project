
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import './db.js'; 
import Item from './models/Item.js';
import User from './models/User.js';
import Order from './models/Order.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};


const adminOnly = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admin only' });
    }
    req.userId = decoded.id;
    next();
  });
};


app.get('/test', (req, res) => {
  res.json({ message: 'API is running' });
});


app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/items', adminOnly, async (req, res) => {
  try {
    const { name, imgSrc, price, description, category } = req.body;
    const item = new Item({ name, imgSrc, price, description, category });
    await item.save();
    res.status(201).json({ message: 'Produk berhasil ditambahkan', item });
  } catch (err) {
    res.status(500).json({ error: 'Gagal menambahkan produk', detail: err.message });
  }
});


app.put('/items/:id', adminOnly, async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Gagal update', detail: err.message });
  }
});


app.delete('/items/:id', adminOnly, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
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
    res.status(500).json({ error: 'Server error', detail: err.message });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
