# 🧪 React + Node.js Automation App

A minimal full-stack application designed for demonstrating UI and API test automation using Playwright and Express.

---

## 🚀 Features

- 🔐 **User Authentication** (dummy login)
- ✅ **Todo Item CRUD** (Create, Read, Update, Delete)
- ⚙️ **RESTful API** with Node.js + Express
- 🖥️ **React Frontend** with Axios
- 🧪 **Test-Ready** architecture for both UI and API automation

---

## 📁 Project Structure

```
react-node-automation/
├── backend/           # Express API (localhost:4000)
├── frontend/          # React app (localhost:3000)
├── tests/             # Playwright + API test scripts
│   ├── api/
│   └── ui/
├── README.md
```

---

## 🧑‍💻 Getting Started

### ⚙️ Backend Setup

```bash
cd backend
npm install
node index.js
```

📍 Runs at: `http://localhost:4000`

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

📍 Runs at: `http://localhost:3000`

### 🧪 Dummy Login Credentials

| Username | Password |
|----------|----------|
| `user`   | `pass`   |

---

## 📡 API Endpoints

| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| POST   | `/login`         | Authenticate user     |
| GET    | `/items`         | List all items        |
| POST   | `/items`         | Create new item       |
| PUT    | `/items/:id`     | Update existing item  |
| DELETE | `/items/:id`     | Delete item           |

---

## 🧪 Testing Setup

### ✅ UI Testing with Playwright

- Tests located in: `tests/ui/`
- Login, create, edit, and delete todos
- npx playwright test tests/ui

### ✅ API Testing with Playwright

- Tests located in: `tests/ui/`
- Login, create, edit, and delete todos
- npx playwright test tests/api