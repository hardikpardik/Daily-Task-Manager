const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, returnedTask) => {
        returnedTask.id = returnedTask._id.toString();
        delete returnedTask._id;

        if (returnedTask.dueDate) {
          returnedTask.dueDate = returnedTask.dueDate.toISOString().slice(0, 10);
        }

        return returnedTask;
      },
    },
  }
);

module.exports = mongoose.model("Task", taskSchema);
