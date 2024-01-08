import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DB from "../../models/db";

import { JWT_SECRET } from "../../config";
import { Request, Response } from "express";

const { UserModel } = DB;

// Login and generate token
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ error: true, message: "Invalid credentials" });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res
        .status(401)
        .json({ error: true, message: "Invalid credentials" });
    const token = jwt.sign(
      { email: user.email, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "4h", // Token expiration time
      }
    );
    res.json({ token, error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Oops something went wrong" });
  }
};
