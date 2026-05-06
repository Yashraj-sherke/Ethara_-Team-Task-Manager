<![CDATA[<div align="center">

# 🏗️ Ethara — Team Task Manager

**A full-stack web application for managing team projects, assigning tasks, tracking progress, and handling role-based access control.**

[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

[Live Demo](#-live-demo) · [Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [API Reference](#-api-reference)

</div>

---

## 🌐 Live Demo

| Service  | URL |
|----------|-----|
| **Frontend** | [ethara-team-task-manager-ten.vercel.app](https://ethara-team-task-manager-ten.vercel.app/) |
| **Backend API** | [ethara-team-task-manager.onrender.com](https://ethara-team-task-manager.onrender.com/) |

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| 🔑 Admin | `admin@taskmanager.com` | `admin123` |
| 👤 Member | `sarah@taskmanager.com` | `member123` |

> **Note:** The Render free tier may take ~30 seconds to cold-start the backend on first request.

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based signup, login, and logout
- Password hashing with **bcrypt** (12 salt rounds)
- Persistent auth state with token storage
- Role-based access control — **Admin** (full CRUD) & **Member** (limited access)

### 📊 Dashboard
- Real-time stats cards — total projects, tasks, completed, pending, overdue, in-progress
- Task distribution breakdown by status
- Recent activity feed (last 10 updated tasks)
- Scoped views — admins see everything, members see only their assigned projects

### 📁 Project Management
- Create, edit, and delete projects (Admin only)
- Add/remove team members to projects
- Project status tracking — `Active` · `Completed` · `Archived`
- Virtual population of associated tasks

### ✅ Task Management
- Create, assign, update, and delete tasks
- Status workflow: `Todo` → `In Progress` → `Completed`
- Priority levels: `Low` · `Medium` · `High`
- Due date tracking with overdue detection
- Filter tasks by project

### 👥 Team Members
- Admin panel to view all registered users
- Add members to specific projects
- Role-based visibility controls

### 🎨 UI/UX
- Clean, responsive design with **Tailwind CSS v4**
- Dark / Light mode toggle with local storage persistence
- Toast notifications via **react-hot-toast**
- Form validation with **React Hook Form** + **Zod** schemas
- Mobile-first responsive layout

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 19** | UI library |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS v4** | Utility-first styling |
| **React Router v7** | Client-side routing |
| **Axios** | HTTP client |
| **React Hook Form** | Form state management |
| **Zod** | Schema validation |
| **React Icons** | Icon library |
| **React Hot Toast** | Notification toasts |

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB Atlas** | Cloud database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Helmet** | Security headers |
| **express-rate-limit** | API rate limiting (200 req/15 min) |
| **Morgan** | HTTP request logging (dev mode) |
| **CORS** | Cross-origin resource sharing |

### Deployment

| Service | Layer |
|---------|-------|
| **Vercel** | Frontend hosting |
| **Render** | Backend API hosting |
| **Railway** | Alternative full-stack deployment |

---

## 📂 Project Structure

```
Ethara/
├── backend/
│   ├── config/              # Database connection setup
│   ├── controllers/         # Route handler logic
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── projectController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js          # JWT verification middleware
│   │   ├── errorHandler.js  # Global error handler
│   │   └── roleCheck.js     # Role-based access guard
│   ├── models/
│   │   ├── User.js          # User schema (name, email, password, role)
│   │   ├── Project.js       # Project schema (name, desc, owner, members, status)
│   │   └── Task.js          # Task schema (title, desc, status, priority, dueDate)
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   ├── seeds/
│   │   └── seedData.js      # Database seeder script
│   ├── utils/               # Helper utilities
│   ├── .env.example         # Environment variables template
│   └── server.js            # Express app entry point
│
├── frontend/
│   ├── public/              # Static assets
│   └── src/
│       ├── api/             # Axios API service layer
│       ├── assets/          # Images & static files
│       ├── components/
│       │   ├── common/      # Reusable UI components
│       │   ├── dashboard/   # Dashboard-specific components
│       │   ├── layout/      # Layout wrapper, sidebar, navbar
│       │   ├── projects/    # Project-related components
│       │   └── tasks/       # Task-related components
│       ├── context/
│       │   ├── AuthContext.jsx   # Authentication state
│       │   └── ThemeContext.jsx  # Dark/Light mode state
│       ├── hooks/           # Custom React hooks
│       ├── pages/
│       │   ├── auth/        # Login & Signup pages
│       │   ├── Dashboard.jsx
│       │   ├── Projects.jsx
│       │   ├── ProjectDetail.jsx
│       │   ├── Tasks.jsx
│       │   ├── Members.jsx
│       │   └── NotFound.jsx
│       ├── routes/          # Route guards (ProtectedRoute)
│       ├── utils/           # Frontend utilities
│       ├── App.jsx          # Root component with routing
│       └── main.jsx         # App entry point
│
├── package.json             # Root-level scripts
├── railway.json             # Railway deployment config
├── render.yaml              # Render deployment config
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.0.0
- **npm** ≥ 10
- **MongoDB** — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the Repository

```bash
git clone https://github.com/Yashraj-sherke/Ethara_-Team-Task-Manager.git
cd Ethara_-Team-Task-Manager
```

### 2. Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
```

> **Tip:** Copy from `backend/.env.example` as a starting template.

### 3. Install Dependencies

```bash
# From root — installs both backend & frontend
npm run install-all
```

Or install separately:

```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install --legacy-peer-deps
```

### 4. Seed the Database (Optional)

Populate the database with sample users, projects, and tasks:

```bash
cd backend
npm run seed
```

### 5. Start Development Servers

```bash
# Backend (from backend/)
npm run dev          # Starts on http://localhost:5000

# Frontend (from frontend/)
npm run dev          # Starts on http://localhost:5173
```

---

## 📡 API Reference

**Base URL:** `http://localhost:5000/api`

All protected routes require an `Authorization: Bearer <token>` header.

### Auth

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/auth/signup` | Public | Register a new user |
| `POST` | `/auth/login` | Public | Login & receive JWT |
| `GET` | `/auth/me` | Protected | Get current user profile |

### Projects

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/projects` | Protected | List all projects |
| `POST` | `/projects` | Admin | Create a project |
| `GET` | `/projects/:id` | Protected | Get project details |
| `PUT` | `/projects/:id` | Admin | Update a project |
| `DELETE` | `/projects/:id` | Admin | Delete a project |
| `POST` | `/projects/:id/members` | Admin | Add member to project |
| `DELETE` | `/projects/:id/members/:userId` | Admin | Remove member from project |
| `GET` | `/projects/:id/tasks` | Protected | Get tasks for a project |

### Tasks

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/tasks` | Protected | List all tasks |
| `POST` | `/tasks` | Protected | Create a task |
| `GET` | `/tasks/:id` | Protected | Get task details |
| `PUT` | `/tasks/:id` | Protected | Update a task |
| `DELETE` | `/tasks/:id` | Protected | Delete a task |

### Dashboard

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/dashboard` | Protected | Get dashboard statistics |

### Users

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/users` | Admin | List all users |

### Health Check

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/health` | Public | API status check |

---

## ☁️ Deployment

### Frontend → Vercel

1. Import your GitHub repository on [vercel.com](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Set **Framework Preset** to `Vite`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
5. Deploy 🚀

### Backend → Render

1. Create a new **Web Service** on [render.com](https://render.com)
2. Connect your GitHub repository
3. Set **Root Directory** to `backend`
4. Set **Build Command** to `npm install`
5. Set **Start Command** to `node server.js`
6. Add environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your_production_secret
   JWT_EXPIRE=30d
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

### Full-Stack → Railway (Alternative)

1. Import your GitHub repository on [railway.app](https://railway.app)
2. The included `railway.json` handles build & deploy configuration automatically
3. Add the same environment variables as above

---

## 🔒 Security Features

- **Helmet** — Sets secure HTTP headers
- **Rate Limiting** — 200 requests per 15-minute window per IP
- **CORS** — Restricted to configured origins
- **bcrypt** — Passwords hashed with 12 salt rounds
- **JWT** — Stateless token-based authentication with configurable expiration
- **Input Validation** — Server-side Mongoose validators + client-side Zod schemas
- **Password field protection** — Password excluded from queries by default (`select: false`)

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m "Add amazing feature"`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by [Yashraj Sherke](https://github.com/Yashraj-sherke)**

</div>
]]>
