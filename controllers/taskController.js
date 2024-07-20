import Task from "../models/Task.js";
import { validationResult } from "express-validator";

// create task
export const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description, status } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      status,
      userId: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// get task

export const getTask = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// update task

export const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description, status } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// delete task

export const deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Task removed" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};
