import TaskItem from "./TaskItem.jsx";

function TaskList({ tasks, onDelete, onEdit, onToggleStatus }) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks found.</p>;
  }

  return (
    <section className="task-list" aria-label="Tasks">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </section>
  );
}

export default TaskList;
