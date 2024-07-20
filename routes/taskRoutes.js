import express from "express";
import {
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { check } from "express-validator";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protectRoute);

router.post(
  "/createTask",
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("status", "Status is required").not().isEmpty(),
  ],
  createTask
);

router.get("/getTask", getTask);

router.put("/updateTask/:id", updateTask);

router.delete("/deleteTask/:id", deleteTask);

export default router;
