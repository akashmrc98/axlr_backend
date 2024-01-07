import express from "express";
import { loginController } from "../controllers/users/login.controller";
import { registerUserController } from "../controllers/users/registerUser.controller";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerUserController);

export default router;
