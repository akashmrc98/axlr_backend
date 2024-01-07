import DB from "../models/db";
import ExcelJS from "exceljs";
import { Request, Response } from "express";
import { Product } from "../models/product.model";

const { ProductModel } = DB;

export const uploadProductsController = async (req: Request, res: Response) => {
  try {
    if (!(req as any).file)
      return res.status(400).json({ error: "No file uploaded" });

    console.log(req.file);

    // Assuming 'name' and 'price' columns in the Excel file
    const workbook: ExcelJS.Workbook = new ExcelJS.Workbook();
    const buffer: Buffer = (req as any).file.buffer;
    await workbook.csv.readFile(String(buffer));

    const products: Product[] = [];
    const worksheet = workbook.getWorksheet(1); // Assuming data is in the first sheet

    console.log(worksheet);
    if (worksheet) {
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
          const productData: Product = {
            name: String(row.getCell(1).value), // Assuming name is in the first column
            category: String(row.getCell(2).value), // Assuming price is in the second column
            price: Number(row.getCell(3).value), // Assuming price is in the second column
            rating: Number(row.getCell(4).value), // Assuming price is in the second column
            description: String(row.getCell(1).value), // Assuming price is in the second column
            imageUrl: String(row.getCell(5).value), // Assuming price is in the second column
          };
          products.push(productData);
        }
      });
    }

    // Save product data in the database
    await ProductModel.insertMany(products);
    res.status(200).json({ message: "Product data uploaded successfully" });
  } catch (error) {
    console.error("Error uploading product data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve and send product data from the database
export const getProductsController = async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
