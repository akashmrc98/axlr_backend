import express from "express";

import multerUpload from "../middlewares/multerUpload";
import authenticateToken from "../middlewares/authenticateToken";

import { getProductsController } from "../controllers/products/getProducts.controller";
import { uploadProductsController } from "../controllers/products/uploadProducts.controller";
import { getProductsPaginationController } from "../controllers/products/getProductPagination.controller";

const router = express.Router();

router.post(
  "/upload",
  authenticateToken,
  multerUpload,
  uploadProductsController
);

router.get("/", authenticateToken, getProductsController);
router.get("/pagination", authenticateToken, getProductsPaginationController);

export default router;
