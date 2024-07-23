import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { check } from "express-validator";
import passport from "passport";

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

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5174/login",
  }),
  (req, res) => {
    // On success, redirect to a special route in React

    console.log(res, "gcbwudhscbwdn");
    res.redirect("http://localhost:5174/task");
  }
);

export default router;
