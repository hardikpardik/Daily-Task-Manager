const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "API request failed");
  }

  return result;
}

export async function fetchTasks(filters) {
  const params = new URLSearchParams();

  if (filters.status && filters.status !== "all") {
    params.set("status", filters.status);
  }

  if (filters.priority && filters.priority !== "all") {
    params.set("priority", filters.priority);
  }

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.due === "overdue") {
    params.set("overdue", "true");
  }

  const queryString = params.toString();
  const path = queryString ? `/tasks?${queryString}` : "/tasks";
  const result = await request(path);

  return result.data;
}

export async function createTask(task) {
  const result = await request("/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });

  return result.data;
}

export async function updateTask(taskId, task) {
  const result = await request(`/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });

  return result.data;
}

export async function deleteTask(taskId) {
  const result = await request(`/tasks/${taskId}`, {
    method: "DELETE",
  });

  return result.data;
}
