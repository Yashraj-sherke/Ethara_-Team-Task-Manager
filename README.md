# Team Task Manager

A full-stack web application for managing team projects, assigning tasks, tracking progress, and handling role-based access control (Admin & Member).

## Tech Stack

| Layer      | Technology                                      |
|------------|------------------------------------------------|
| Frontend   | React.js (Vite), Tailwind CSS v4, React Router |
| Backend    | Node.js, Express.js                            |
| Database   | MongoDB with Mongoose                          |
| Auth       | JWT + bcrypt                                   |
| Validation | React Hook Form + Zod                          |
| Deployment | Railway-ready                                  |

## Features

- **Authentication** – Signup, Login, Logout with JWT-based auth
- **Role-Based Access Control** – Admin (full access) and Member (limited)
- **Project Management** – Create, edit, delete projects; manage members
- **Task Management** – Create, assign, update status (todo → in-progress → completed)
- **Dashboard** – Stats cards, recent activity feed
- **Due Date Tracking** – Overdue detection with visual indicators
- **Filtering** – Filter tasks by status and due date
- **Responsive Design** – Mobile-first with sidebar navigation

## Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm

## Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd team-task-manager
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env    # Edit with your values
npm install
npm run seed            # Load demo data
npm run dev             # Starts on port 5000
```

### 3. Frontend Setup

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev             # Starts on port 5173
```

## Environment Variables

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
```

## Demo Credentials

| Role   | Email                     | Password   |
|--------|--------------------------|------------|
| Admin  | admin@taskmanager.com    | admin123   |
| Member | sarah@taskmanager.com    | member123  |
| Member | mike@taskmanager.com     | member123  |
| Member | emily@taskmanager.com    | member123  |

## API Endpoints

### Auth
- `POST /api/auth/signup` – Register
- `POST /api/auth/login` – Login
- `GET /api/auth/me` – Current user

### Projects
- `GET /api/projects` – List projects
- `POST /api/projects` – Create (Admin)
- `GET /api/projects/:id` – Project details
- `PUT /api/projects/:id` – Update (Admin)
- `DELETE /api/projects/:id` – Delete (Admin)
- `POST /api/projects/:id/members` – Add member (Admin)
- `DELETE /api/projects/:id/members/:userId` – Remove member (Admin)
- `GET /api/projects/:id/tasks` – Project tasks

### Tasks
- `GET /api/tasks` – List tasks (with filters)
- `POST /api/tasks` – Create task
- `GET /api/tasks/:id` – Task details
- `PUT /api/tasks/:id` – Update task
- `DELETE /api/tasks/:id` – Delete task

### Users & Dashboard
- `GET /api/users` – All users (Admin)
- `GET /api/dashboard` – Dashboard stats

## Railway Deployment

1. Push code to GitHub
2. Create a new project on Railway
3. Add a MongoDB plugin
4. Deploy backend service from `backend/` directory
5. Set environment variables in Railway dashboard
6. Deploy frontend service from `frontend/` directory (build command: `npm run build`, start: serve `dist/`)

## Project Structure

```
├── backend/
│   ├── config/db.js
│   ├── controllers/ (auth, project, task, user, dashboard)
│   ├── middleware/ (auth, roleCheck, errorHandler)
│   ├── models/ (User, Project, Task)
│   ├── routes/ (auth, project, task, user, dashboard)
│   ├── utils/ (generateToken, helpers)
│   ├── seeds/seedData.js
│   └── server.js
└── frontend/
    └── src/
        ├── api/ (axios, services)
        ├── components/ (layout, common, dashboard, projects, tasks)
        ├── context/AuthContext.jsx
        ├── hooks/useAuth.js
        ├── pages/ (Dashboard, Projects, Tasks, Members, auth/)
        ├── routes/ProtectedRoute.jsx
        ├── utils/helpers.js
        └── App.jsx
```

## License

MIT
