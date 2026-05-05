# Team Task Manager

A full-stack web application for managing team projects, assigning tasks, tracking progress, and handling role-based access control (Admin & Member).

## 🚀 Live Demo

- **Frontend**: [https://ethara-team-task-manager-ten.vercel.app/](https://ethara-team-task-manager-ten.vercel.app/)
- **Backend API**: [https://ethara-team-task-manager.onrender.com/](https://ethara-team-task-manager.onrender.com/)

## Tech Stack

| Layer      | Technology                                      |
|------------|------------------------------------------------|
| Frontend   | React.js (Vite), Tailwind CSS v4, React Router |
| Backend    | Node.js, Express.js                            |
| Database   | MongoDB Atlas (Mongoose)                       |
| Auth       | JWT + bcrypt                                   |
| Validation | React Hook Form + Zod                          |
| Deployment | Vercel (Frontend) & Render (Backend)           |

## Features

- **Authentication** – Signup, Login, Logout with JWT-based auth
- **Role-Based Access Control** – Admin (full access) and Member (limited)
- **Project Management** – Create, edit, delete projects; manage members
- **Task Management** – Create, assign, update status (todo → in-progress → completed)
- **Dashboard** – Stats cards, recent activity feed
- **Responsive Design** – Mobile-first with sleek dark/light mode toggle

## Demo Credentials

| Role   | Email                     | Password   |
|--------|--------------------------|------------|
| Admin  | admin@taskmanager.com    | admin123   |
| Member | sarah@taskmanager.com    | member123  |

## Deployment Instructions

### Backend (Render)
1. Connect GitHub repo.
2. Set **Root Directory** to `backend`.
3. Add Environment Variables: `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`.

### Frontend (Vercel)
1. Connect GitHub repo.
2. Set **Root Directory** to `frontend`.
3. Add Environment Variable: `VITE_API_URL` (pointing to Render URL).

## License

MIT
