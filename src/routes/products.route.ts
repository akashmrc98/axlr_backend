import express from "express";
import {
  getProductsController,
  uploadProductsController,
} from "../controllers/products.controller";

import multerUpload from "../middlewares/multerUpload";
import authenticateToken from "../middlewares/authenticateToken";

const router = express.Router();

router.post(
  "/upload",
  // authenticateToken,
  multerUpload,
  uploadProductsController
);
router.get("/", authenticateToken, getProductsController);

export default router;
