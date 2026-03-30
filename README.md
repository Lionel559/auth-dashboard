# Auth Dashboard 🚀

A full-stack authentication dashboard built with **React, Node.js, Express, and JWT**.
The project includes user registration, login authentication, and a modern admin dashboard with analytics.

## 🌐 Live Demo

Frontend (Vercel)
https://auth-dashboard-lime.vercel.app/

Backend (Render)
https://auth-dashboard-api.onrender.com

---

## 📌 Features

* User Registration
* User Login
* JWT Authentication
* Admin Dashboard
* Dark Mode Toggle
* User Analytics Chart
* User Edit & Delete
* Responsive UI
* Full-stack deployment

---

## 🛠 Tech Stack

Frontend

* React
* Axios
* Chart.js
* CSS

Backend

* Node.js
* Express
* JWT Authentication
* Bcrypt
* CORS

Deployment

* Vercel (Frontend)
* Render (Backend)
* GitHub (Repository)

---

## 📂 Project Structure

```
auth-dashboard
│
├── backend
│   ├── server.js
│   ├── package.json
│
├── frontend
│   ├── src
│   │   ├── Dashboard.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── App.js
│   │   └── index.js
│
└── README.md
```

---

## ⚙️ Installation (Local Development)

Clone the repository

```
git clone https://github.com/Lionel559/auth-dashboard.git
```

### Backend

```
cd backend
npm install
node server.js
```

Server runs on:

```
http://localhost:5000
```

### Frontend

```
cd frontend
npm install
npm start
```

App runs on:

```
http://localhost:3000
```

---

## 🔐 Authentication Flow

1. User registers an account.
2. Password is hashed using **bcrypt**.
3. User logs in and receives a **JWT token**.
4. Token is stored in **localStorage**.
5. Protected routes verify the token before granting access.

---

## 📊 Dashboard

The dashboard includes:

* User statistics
* Revenue overview
* Orders summary
* Analytics chart
* Recent users table

---

## 📈 Future Improvements

* MongoDB database integration
* Role-based authentication
* Pagination for users
* Search & filtering
* Email verification
* Password reset

---

## 👨‍💻 Author

Elijah (Lionel559)

GitHub
https://github.com/Lionel559

---

## ⭐ If you like this project

Give it a **star ⭐ on GitHub** to support the project.
