import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passwordValidator from "password-validator";

import DB from "../models/db";
import { JWT_SECRET } from "../config";
import { Request, Response } from "express";

const { UserModel } = DB;

// Register a new user
export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    // Create a password schema
    const schema = new passwordValidator();

    // Add password requirements (customize based on your policy)
    schema
      .is()
      .min(8) // Minimum length 8 characters
      .is()
      .max(100) // Maximum length 100 characters
      .has()
      .letters() // Must have letters
      .has()
      .digits() // Must have digits
      .has()
      .not()
      .spaces(); // Should not have spaces

    // Validate the password against the schema
    if (!schema.validate(password)) {
      return res
        .status(400)
        .json({ message: "Password does not meet the requirements" });
    }

    const newUser = new UserModel({
      username,
      email,
      password,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Oops Something went wrong" });
  }
};

// Login and generate token
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { email: user.email, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "30s", // Token expiration time
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Oops something went wrong" });
  }
};
