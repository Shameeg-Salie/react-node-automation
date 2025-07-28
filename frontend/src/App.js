import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:4000';

function App() {
  const [token, setToken] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [items, setItems] = useState([]);
  const [newText, setNewText] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  // Login handler
  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, loginForm);
      setToken(res.data.token);
      setLoginError('');
      fetchItems();
    } catch {
      setLoginError('Invalid username or password.');
    }
  };

  // Fetch items
  const fetchItems = async () => {
    const res = await axios.get(`${API_URL}/items`);
    setItems(res.data);
  };

  // Add item
  const addItem = async () => {
    if (!newText.trim()) return;
    const res = await axios.post(`${API_URL}/items`, { text: newText });
    setItems([...items, res.data]);
    setNewText('');
  };

  // Start editing
  const startEdit = (item) => {
    setEditId(item.id);
    setEditText(item.text);
  };

  // Save edit
  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    const res = await axios.put(`${API_URL}/items/${id}`, { text: editText });
    setItems(items.map(i => (i.id === id ? res.data : i)));
    setEditId(null);
    setEditText('');
  };

  // Delete item
  const deleteItem = async (id) => {
    await axios.delete(`${API_URL}/items/${id}`);
    setItems(items.filter(i => i.id !== id));
  };

  if (!token) {
    return (
      <div className="container">
        <h2>Login</h2>
        <input
          placeholder="Username"
          value={loginForm.username}
          onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
        />
        <button onClick={login}>Login</button>
        {loginError && (
          <p role="alert" style={{ color: 'red', marginTop: '0.5rem' }}>
            {loginError}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Todo List</h2>

      <div>
        <input
          placeholder="New item"
          value={newText}
          onChange={e => setNewText(e.target.value)}
        />
        <button onClick={addItem}>Add</button>
      </div>

      <ul>
        {items.map(item =>
          editId === item.id ? (
            <li key={item.id}>
              <input
                type="text"
                value={editText}
                onChange={e => setEditText(e.target.value)}
              />
              <button className="edit-btn" onClick={() => saveEdit(item.id)}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </li>
          ) : (
            <li key={item.id}>
              <span>{item.text}</span>
              <div>
                <button className="edit-btn" onClick={() => startEdit(item)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteItem(item.id)}>Delete</button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default App;