const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;

// Dummy user
const DUMMY_USER = { username: 'user', password: 'pass' };

// In-memory items store
let items = [];
let nextId = 1;

// POST /login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
    res.json({ success: true, token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// GET /items
app.get('/items', (req, res) => {
  res.json(items);
});

// POST /items
app.post('/items', (req, res) => {
  const { text } = req.body;
  const item = { id: nextId++, text };
  items.push(item);
  res.status(201).json(item);
});

// PUT /items/:id
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text } = req.body;
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  item.text = text;
  res.json(item);
});

// DELETE /items/:id
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(i => i.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Backend listening at http://localhost:${PORT}`);
});
