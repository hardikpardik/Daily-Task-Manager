import { useEffect, useState } from "react";
import TaskFilters from "./components/TaskFilters.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskSummary from "./components/TaskSummary.jsx";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "./services/taskApi.js";

const emptyTask = {
  title: "",
  description: "",
  priority: "medium",
  status: "pending",
  dueDate: "",
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskBeingEdited, setTaskBeingEdited] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    due: "all",
    search: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadTasks() {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const tasksFromApi = await fetchTasks(filters);
      setTasks(tasksFromApi);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [filters.status, filters.priority, filters.due, filters.search]);

  async function handleSaveTask(formData) {
    try {
      setIsLoading(true);
      setErrorMessage("");

      if (taskBeingEdited) {
        await updateTask(taskBeingEdited.id, formData);
        setTaskBeingEdited(null);
      } else {
        await createTask(formData);
      }

      await loadTasks();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleToggleStatus(task) {
    const nextStatus = task.status === "completed" ? "pending" : "completed";

    try {
      setErrorMessage("");
      await updateTask(task.id, {
        ...task,
        status: nextStatus,
      });
      await loadTasks();
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function handleDeleteTask(taskId) {
    const shouldDelete = window.confirm("Delete this task?");

    if (!shouldDelete) {
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      await deleteTask(taskId);
      await loadTasks();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCancelEdit() {
    setTaskBeingEdited(null);
  }

  return (
    <main className="app-shell">
      <section className="app-header">
        <div>
          <h1>Daily Task Manager</h1>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel">
          <TaskForm
            initialTask={taskBeingEdited || emptyTask}
            isEditing={Boolean(taskBeingEdited)}
            onCancel={handleCancelEdit}
            onSave={handleSaveTask}
          />
        </div>

        <div className="task-area">
          <TaskSummary tasks={tasks} />
          <TaskFilters filters={filters} onChange={setFilters} />

          {errorMessage && <p className="message error">{errorMessage}</p>}
          {isLoading && <p className="message">Loading tasks...</p>}

          <TaskList
            tasks={tasks}
            onDelete={handleDeleteTask}
            onEdit={setTaskBeingEdited}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
