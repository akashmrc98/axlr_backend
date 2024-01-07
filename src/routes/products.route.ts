import express from "express";

import multerUpload from "../middlewares/multerUpload";
import authenticateToken from "../middlewares/authenticateToken";
import { uploadProductsController } from "../controllers/products/uploadProducts.controller";
import { getProductsController } from "../controllers/products/getProducts.controller";

const router = express.Router();

router.post(
  "/upload",
  authenticateToken,
  multerUpload,
  uploadProductsController
);
router.get("/", authenticateToken, getProductsController);

export default router;
