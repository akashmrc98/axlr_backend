import express from "express";
import {
  loginController,
  registerUserController,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerUserController);

export default router;
