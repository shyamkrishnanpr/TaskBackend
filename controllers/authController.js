import User from "../models/User.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import { validationResult } from "express-validator";
import { OAuth2Client } from "google-auth-library";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// user registration

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const newUser = await User.create({ firstname, lastname, email, password });

    res.status(201).json({
      _id: newUser._id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// user login

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// google auth

// export const googleAuth = async (req, res) => {
//   console.log("here");
//   const client = new OAuth2Client(process.env.CLIENT_ID);
//   const { token } = req.body;

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.CLIENT_ID,
//     });

//     const { sub, name, email, picture } = ticket.getPayload();

//     let user = await User.findOne({ googleId: sub });

//     if (!user) {
//       user = await User.create({
//         googleId: sub,
//         firstname: name,
//         lastname: name,
//         email,
//       });
//     }

//     res.json({
//       _id: user._id,
//       firstname: user.firstname,
//       lastname: user.lastname,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(400).json({ error: "Invalid Google Token" });
//   }
// };
