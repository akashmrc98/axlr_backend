import DB from "../../models/db";
import { Request, Response } from "express";
import passwordValidator from "password-validator";

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
