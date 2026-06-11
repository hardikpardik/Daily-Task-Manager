function TaskSummary({ tasks }) {
  const completedCount = tasks.filter((task) => task.status === "completed").length;
  const pendingCount = tasks.filter((task) => task.status === "pending").length;
  const highPriorityCount = tasks.filter((task) => task.priority === "high").length;
  const overdueCount = tasks.filter((task) => {
    if (!task.dueDate || task.status === "completed") {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(`${task.dueDate}T00:00:00`);
    return dueDate < today;
  }).length;

  return (
    <section className="summary" aria-label="Task summary">
      <div>
        <strong>{tasks.length}</strong>
        <span>Total</span>
      </div>
      <div>
        <strong>{pendingCount}</strong>
        <span>Pending</span>
      </div>
      <div>
        <strong>{completedCount}</strong>
        <span>Completed</span>
      </div>
      <div>
        <strong>{highPriorityCount}</strong>
        <span>High Priority</span>
      </div>
      <div>
        <strong>{overdueCount}</strong>
        <span>Overdue</span>
      </div>
    </section>
  );
}

export default TaskSummary;
