import DB from "../../models/db";
import { Product } from "../../models/product.model";
import { ProductServices } from "../../services/products.service";

import { Request, Response } from "express";

const { ProductModel } = DB;

export const uploadProductsController = async (req: Request, res: Response) => {
  try {
    const file = (req as any).file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const csvFileContent = file.buffer.toString("utf8");
    const products: Product[] = await ProductServices.parseCSV(csvFileContent);
    // Save product data in the database
    await ProductModel.insertMany(products);
    res
      .status(200)
      .json({ message: "Product data uploaded successfully", data: products });
  } catch (error) {
    console.error("Error uploading product data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
