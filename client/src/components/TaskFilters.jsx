function TaskFilters({ filters, onChange }) {
  function handleChange(event) {
    const { name, value } = event.target;

    onChange({
      ...filters,
      [name]: value,
    });
  }

  return (
    <section className="filters" aria-label="Task filters">
      <label>
        Search
        <input
          name="search"
          onChange={handleChange}
          placeholder="Search by title"
          type="search"
          value={filters.search}
        />
      </label>

      <label>
        Status
        <select name="status" onChange={handleChange} value={filters.status}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <label>
        Priority
        <select name="priority" onChange={handleChange} value={filters.priority}>
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <label>
        Due
        <select name="due" onChange={handleChange} value={filters.due}>
          <option value="all">All</option>
          <option value="overdue">Overdue</option>
        </select>
      </label>
    </section>
  );
}

export default TaskFilters;
