import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { Request, Response, NextFunction } from "express";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Bearer token missing" });
  }
  const token = authHeader.split(" ")[1];
  console.log(token);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    console.log(user);
    if (err)
      return res.status(403).json({ message: "Forbidden - Invalid token" });
    next();
  });
};

export default authenticateToken;
