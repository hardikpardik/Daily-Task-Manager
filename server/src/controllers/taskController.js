const { isValidObjectId } = require("mongoose");
const Task = require("../models/Task");

const allowedPriorities = ["low", "medium", "high"];
const allowedStatuses = ["pending", "completed"];

function sendValidationError(res, message) {
  return res.status(400).json({
    success: false,
    message,
  });
}

function normalizeTaskInput(body) {
  return {
    title: typeof body.title === "string" ? body.title.trim() : "",
    description:
      typeof body.description === "string" ? body.description.trim() : "",
    priority: body.priority || "medium",
    status: body.status || "pending",
    dueDate: body.dueDate || null,
  };
}

function validateTaskInput(res, taskInput) {
  if (!taskInput.title) {
    return sendValidationError(res, "Title is required");
  }

  if (!allowedPriorities.includes(taskInput.priority)) {
    return sendValidationError(res, "Priority must be low, medium, or high");
  }

  if (!allowedStatuses.includes(taskInput.status)) {
    return sendValidationError(res, "Status must be pending or completed");
  }

  if (taskInput.dueDate && Number.isNaN(Date.parse(taskInput.dueDate))) {
    return sendValidationError(res, "Due date must be a valid date");
  }

  return null;
}

function buildTaskQuery(queryParams) {
  const query = {};

  if (queryParams.status && queryParams.status !== "all") {
    query.status = queryParams.status;
  }

  if (queryParams.priority && queryParams.priority !== "all") {
    query.priority = queryParams.priority;
  }

  if (queryParams.search) {
    query.title = {
      $regex: queryParams.search,
      $options: "i",
    };
  }

  if (queryParams.overdue === "true") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    query.status = "pending";
    query.dueDate = {
      $lt: today,
    };
  }

  return query;
}

function validateTaskId(res, id) {
  if (!isValidObjectId(id)) {
    return sendValidationError(res, "Invalid task id");
  }

  return null;
}

async function getTasks(req, res, next) {
  try {
    const query = buildTaskQuery(req.query);
    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
}

async function getTaskById(req, res, next) {
  try {
    const idError = validateTaskId(res, req.params.id);

    if (idError) {
      return idError;
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
}

async function createTask(req, res, next) {
  try {
    const taskInput = normalizeTaskInput(req.body);
    const validationError = validateTaskInput(res, taskInput);

    if (validationError) {
      return validationError;
    }

    const newTask = await Task.create(taskInput);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  try {
    const idError = validateTaskId(res, req.params.id);

    if (idError) {
      return idError;
    }

    const existingTask = await Task.findById(req.params.id);

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const taskInput = normalizeTaskInput({
      ...existingTask.toObject(),
      ...req.body,
    });
    const validationError = validateTaskInput(res, taskInput);

    if (validationError) {
      return validationError;
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, taskInput, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    const idError = validateTaskId(res, req.params.id);

    if (idError) {
      return idError;
    }

    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
};
