function formatDate(dateValue) {
  if (!dateValue) {
    return "No due date";
  }

  const date =
    dateValue.length === 10
      ? new Date(`${dateValue}T00:00:00`)
      : new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "No due date";
  }

  return date.toLocaleDateString();
}

function TaskItem({ task, onDelete, onEdit, onToggleStatus }) {
  return (
    <article className={`task-item ${task.status}`}>
      <div className="task-main">
        <div>
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
        </div>

        <span className={`status-pill ${task.status}`}>{task.status}</span>
      </div>

      <div className="task-meta">
        <span>Priority: {task.priority}</span>
        <span>Due: {formatDate(task.dueDate)}</span>
      </div>

      <div className="task-actions">
        <button
          className="button secondary"
          onClick={() => onToggleStatus(task)}
          type="button"
        >
          Mark {task.status === "completed" ? "Pending" : "Complete"}
        </button>
        <button
          className="button secondary"
          onClick={() => onEdit(task)}
          type="button"
        >
          Edit
        </button>
        <button
          className="button danger"
          onClick={() => onDelete(task.id)}
          type="button"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
