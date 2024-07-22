import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { check } from "express-validator";



const router = express.Router();

router.post(
  "/register",
  [
    check("firstname", "Firstname is required").not().isEmpty(),
    check("lastname", "Lastname is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  registerUser
);

router.post("/login", loginUser);





export default router;
