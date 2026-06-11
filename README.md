# Daily Task Manager

A full-stack task manager built with React, Express, Node.js, MongoDB, and Mongoose.

Users can add, view, edit, complete, delete, search, and filter daily tasks. The React frontend sends requests to the Express backend, and the backend stores task data in MongoDB.

## Tech Stack

- React and Vite for the frontend
- Node.js and Express for the backend API
- MongoDB for the database
- Mongoose for the task schema and MongoDB queries

## Features

- Add new tasks
- View all tasks
- Edit existing tasks
- Mark tasks as pending or completed
- Delete tasks after confirmation
- Search tasks by title
- Filter by status, priority, and overdue tasks
- Show task summary counts
- Save tasks in MongoDB

## Project Structure

```text
daily-task-manager/
  client/   React frontend
  server/   Express backend
```

## Run This Project From GitHub

Follow these steps on any new device.

## 1. Install Required Software

Install these first:

- Git
- Node.js
- MongoDB Community Edition

Check Git and Node:

```powershell
git --version
node --version
npm --version
```

## 2. Clone The Repository

Open the GitHub repository page.

Click **Code**, copy the HTTPS URL, then run:

```powershell
cd Desktop
git clone https://github.com/your-username/daily-task-manager.git
cd daily-task-manager
```

Replace the URL with your actual GitHub repository URL.

## 3. Install Dependencies

If PowerShell blocks `npm`, use `npm.cmd`.

Install frontend dependencies:

```powershell
cd client
npm.cmd install
```

Install backend dependencies:

```powershell
cd ../server
npm.cmd install
```

Go back to the project root:

```powershell
cd ..
```

## 4. Create Environment Files

Create the frontend `.env` file:

```powershell
Copy-Item client/.env.example client/.env
```

Create the backend `.env` file:

```powershell
Copy-Item server/.env.example server/.env
```

The frontend `.env` should contain:

```env
VITE_API_URL=http://localhost:5000/api
```

The backend `.env` should contain:

```env
PORT=5000
CLIENT_URL=http://localhost:5173,http://127.0.0.1:5173
MONGO_URI=mongodb://127.0.0.1:27017/task-manager
```

## 5. Start MongoDB Community Edition

Make sure MongoDB is running on the device.

On Windows, MongoDB Community Edition usually runs as a service named **MongoDB Server**. Start it from the Services app if it is not already running.

The local database URL is:

```text
mongodb://127.0.0.1:27017/task-manager
```

MongoDB will create the `task-manager` database automatically when the first task is saved.

Important: local MongoDB data is stored on that device only. If you clone this project on another laptop, it will start with a separate local database.

## 6. Run The Backend

Open a terminal in the project folder:

```powershell
cd server
npm.cmd run dev
```

The backend runs at:

```text
http://localhost:5000
```

Test route:

```text
http://localhost:5000/api/health
```

## 7. Run The Frontend

Open a second terminal in the project folder:

```powershell
cd client
npm.cmd run dev
```

Open the app in your browser:

```text
http://127.0.0.1:5173
```

## Quick Command Summary

```powershell
git clone https://github.com/your-username/daily-task-manager.git
cd daily-task-manager
cd client
npm.cmd install
cd ../server
npm.cmd install
cd ..
Copy-Item client/.env.example client/.env
Copy-Item server/.env.example server/.env
```

Then start MongoDB, run the backend, and run the frontend.

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

Example task body:

```json
{
  "title": "Finish React notes",
  "description": "Revise components, props, state, and API calls.",
  "priority": "high",
  "status": "pending",
  "dueDate": "2026-06-10"
}
```

## How The App Works

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
