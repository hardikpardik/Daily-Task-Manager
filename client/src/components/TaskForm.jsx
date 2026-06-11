import { useEffect, useState } from "react";

function TaskForm({ initialTask, isEditing, onCancel, onSave }) {
  const [formData, setFormData] = useState(initialTask);

  useEffect(() => {
    setFormData(initialTask);
  }, [initialTask]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave(formData);

    if (!isEditing) {
      setFormData(initialTask);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <h2>{isEditing ? "Edit Task" : "Add Task"}</h2>
        {isEditing && (
          <button className="button secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      <label>
        Title
        <input
          name="title"
          onChange={handleChange}
          placeholder="Example: Finish React notes"
          required
          type="text"
          value={formData.title}
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Add a short detail"
          rows="4"
          value={formData.description}
        />
      </label>

      <div className="form-row">
        <label>
          Priority
          <select
            name="priority"
            onChange={handleChange}
            value={formData.priority}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Status
          <select name="status" onChange={handleChange} value={formData.status}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>

      <label>
        Due Date
        <input
          name="dueDate"
          onChange={handleChange}
          type="date"
          value={formData.dueDate}
        />
      </label>

      <button className="button primary" type="submit">
        {isEditing ? "Save Changes" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;
