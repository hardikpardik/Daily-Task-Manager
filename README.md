# Daily Task Manager

A full-stack task manager built with React, Express, Node.js, MongoDB, and Mongoose.

The app lets users create, view, edit, complete, delete, search, and filter daily tasks. The frontend talks to the backend through REST API routes, and the backend stores task data in MongoDB.

## Tech Stack

- React for the frontend
- Vite for local frontend development and production builds
- Node.js and Express for the backend API
- MongoDB for task storage
- Mongoose for the task schema and database queries

## Folder Structure

```text
daily-task-manager/
  client/   React app
  server/   Express API
```

## Main Features

- Add new tasks
- View all saved tasks
- Edit existing tasks
- Mark tasks as pending or completed
- Delete tasks after confirmation
- Search tasks by title
- Filter by status, priority, and overdue tasks
- Show total, pending, completed, high priority, and overdue counts
- Store task data in MongoDB

## Task Fields

Each task stores:

- `title`
- `description`
- `priority`
- `status`
- `dueDate`
- `createdAt`
- `updatedAt`

## API Routes

Base URL:

```text
http://localhost:5000/api
```

Routes:

```text
GET     /api/health
GET     /api/tasks
GET     /api/tasks?status=pending
GET     /api/tasks?status=completed
GET     /api/tasks?priority=high
GET     /api/tasks?overdue=true
GET     /api/tasks?search=react
GET     /api/tasks/:id
POST    /api/tasks
PUT     /api/tasks/:id
DELETE  /api/tasks/:id
```

Example request body:

```json
{
  "title": "Finish React notes",
  "description": "Revise components, props, state, and API calls.",
  "priority": "high",
  "status": "pending",
  "dueDate": "2026-06-10"
}
```

## Local MongoDB Setup

This project is ready to use MongoDB Community Edition locally.

Start MongoDB on your computer, then use this backend connection string:

```env
MONGO_URI=mongodb://127.0.0.1:27017/task-manager
```

MongoDB will create the `task-manager` database when the first task is saved.

## Environment Files

Create the frontend environment file:

```powershell
Copy-Item client/.env.example client/.env
```

Create the backend environment file:

```powershell
Copy-Item server/.env.example server/.env
```

Frontend environment:

```env
VITE_API_URL=http://localhost:5000/api
```

Backend environment:

```env
PORT=5000
CLIENT_URL=http://localhost:5173,http://127.0.0.1:5173
MONGO_URI=mongodb://127.0.0.1:27017/task-manager
```

## Install Dependencies

If PowerShell blocks `npm`, use `npm.cmd`.

Frontend:

```powershell
cd client
npm.cmd install
```

Backend:

```powershell
cd ../server
npm.cmd install
```

## Run The App

Start MongoDB Community Edition first.

Start the backend:

```powershell
cd server
npm.cmd run dev
```

Start the frontend in a second terminal:

```powershell
cd client
npm.cmd run dev
```

Open the app:

```text
http://127.0.0.1:5173
```

## Project Flow

```text
User action in React
-> fetch request from taskApi.js
-> Express route
-> controller function
-> Mongoose Task model
-> MongoDB database
-> JSON response
-> React state update
-> UI update
```

## Deployment Notes

For deployment, the same code can use MongoDB Atlas instead of local MongoDB Community Edition.

Frontend environment variable:

```env
VITE_API_URL=https://your-backend-url/api
```

Backend environment variables:

```env
PORT=5000
CLIENT_URL=https://your-frontend-url
MONGO_URI=mongodb+srv://username:password@cluster-name.mongodb.net/task-manager
```

Do not commit real database passwords or private environment files.
