const router = require("express").Router();
const Task = require("../modules/task");
const User = require("../modules/user");
const { authToken } = require("./auth");

// Create a new task
router.post("/newtask", authToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id: userId } = req.user; // Extracted from JWT token
    const newTask = new Task({ title, description });
    const savedTask = await newTask.save();
    await User.findByIdAndUpdate(userId, { $push: { tasks: savedTask._id } });
    res
      .status(200)
      .json({ message: "Task created successfully", task: savedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all tasks for a user
router.get("/alltasks", authToken, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const userData = await User.findById(userId).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a task
router.delete("/deletetask/:id", authToken, async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { id: userId } = req.user;
    await Task.findByIdAndDelete(taskId);
    await User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update a task
router.put("/updatetask/:id", authToken, async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { title, description } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Toggle task importance
router.put("/updateimportanttask/:id", authToken, async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findById(taskId);
    task.important = !task.important;
    await task.save();
    res
      .status(200)
      .json({ message: "Task importance toggled successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Toggle task completion
router.put("/updatecompletetask/:id", authToken, async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findById(taskId);
    task.complete = !task.complete;
    await task.save();
    res
      .status(200)
      .json({ message: "Task completion toggled successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get important tasks
router.get("/importanttasks", authToken, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const user = await User.findById(userId).populate({
      path: "tasks",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: user.tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get completed tasks
router.get("/completedtasks", authToken, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const user = await User.findById(userId).populate({
      path: "tasks",
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: user.tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get incomplete tasks
router.get("/incompletedtasks", authToken, async (req, res) => {
  try {
    const { id: userId } = req.user;
    const user = await User.findById(userId).populate({
      path: "tasks",
      match: { complete: false },
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: user.tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
