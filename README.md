<div align="center">

# 🏆 X-Ports — Multi-Purpose Contest Management Platform

**A full-stack, high-performance contest management platform for creative & technical competitions.**

[![Live Demo](https://img.shields.io/badge/🔗%20Live%20Demo-Visit%20Site-6366f1?style=for-the-badge)](https://xports-jet.vercel.app)
[![Client Repo](https://img.shields.io/badge/GitHub-Client%20Repo-181717?style=for-the-badge&logo=github)](https://github.com/nimostic/Xports)
[![Server Repo](https://img.shields.io/badge/GitHub-Server%20Repo-181717?style=for-the-badge&logo=github)](https://github.com/nimostic/Xports---Server)

</div>

---

## 📖 Overview

**X-Ports** is built using the **MERN Stack**, enabling organizations and creators to host, manage, and participate in a wide range of competitions — including **Gaming, Creative Arts, Programming, Marketing, Photography, and Writing etc.**.

It features secure authentication, role-based dashboards, Stripe payment integration, real-time countdown timers, and a fully responsive interface with dark/light mode support.

---

## 🌐 Live Demo & Credentials

> Use the following accounts to explore different roles without registering.

| Role | Email | Password |
|------|-------|----------|
| 👑 Admin | `admin@gmail.com` | `Pa$$w0rd!` |
| 🧑‍💼 Creator | `creator@gmail.com` | `Pa$$w0rd!` |
| 👤 User | Register a new account | — |

---

## 🚀 Key Features

- 🎭 **Multi-Category Contests** — Image Design, Web Dev, Marketing, Photography, Writing & more
- 🔐 **JWT Auth + RBAC** — Role-Based Access Control with protected routes (Admin / Creator / User)
- 💳 **Stripe Payments** — Secure contest entry fee processing with payment verification
- ⏳ **Real-Time Timers** — Live countdown, automatic deadline tracking & contest status updates
- 🥇 **Result Management** — Submission handling, winner selection, leaderboards & rankings
- 📜 **Archive System** — Past contest history, archived results & performance tracking
- 🎨 **Modern UI/UX** — Responsive design, Dark/Light mode, smooth animations

---

## 🛠️ Tech Stack

### 🖥️ Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### ⚙️ Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

### 🗄️ Database

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### 🔐 Auth & Security

![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### 💳 Payments

![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)

### 🚢 Deployment

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 📂 Project Structure

```
Xports/
│
├── client/                  # Frontend (React + Vite)
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Route-level pages
│       ├── routes/          # React Router configuration
│       └── main.jsx         # App entry point
│
└── server/                  # Backend (Node.js + Express)
    ├── index.js             # Server entry point
    └── keyconvert.js        # Utility module
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/nimostic/Xports.git
cd Xports
```

### 2. Install Dependencies

**Frontend:**

```bash
cd client
npm install
```

**Backend:**

```bash
cd server
npm install
```

### 3. Environment Variables

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
DB_USER=your_db_username
DB_PASS=your_db_password
ACCESS_TOKEN_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Create a `.env` file inside the `client/` folder:

```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

### 4. Run the Project

**Backend:**

```bash
cd server
node index.js
```

**Frontend:**

```bash
cd client
npm run dev
```

---

## 👥 Role-Based Access Control

| Role | Capabilities |
|------|-------------|
| 👑 **Admin** | Manage all users, approve/reject contests, assign roles, full platform control |
| 🧑‍💼 **Creator** | Create & manage contests, handle submissions, select winners, view analytics |
| 👤 **User** | Browse contests, register & pay, submit entries, view results & rankings |

---

## 🔐 Security Features

- JWT-based stateless authentication
- Role validation middleware on all sensitive routes
- Protected client-side routes per role
- Secure Stripe payment processing
- Environment variable-based secret management

---

## 📸 Screenshots

| Page | Preview |
|------|---------|
| Home | `screenshots/home.png` |
| Dashboard | `screenshots/dashboard.png` |
| Contest | `screenshots/contest.png` |
| Payment | `screenshots/payment.png` |

---

## 🚀 Deployment Guide

| Layer | Platform Options |
|-------|-----------------|
| **Frontend** | Vercel, Netlify, Firebase Hosting |
| **Backend** | Render, Railway, AWS, VPS |
| **Database** | MongoDB Atlas |

---

## 🤝 Contributing

Contributions are welcome and appreciated!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/featureName`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature/featureName`
5. Open a Pull Request

---

## 👨‍💻 Developer

<div align="center">

**Abu Nayeem Riyad**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abunayeemriyad)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://abunriyad.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nimostic)

</div>

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

⭐ **If you found this project helpful, please give it a star!** ⭐

</div>
