import csv from "csv-parser";
import * as XLSX from "xlsx";
import { Readable } from "stream";
import { Product } from "../models/product.model";

export class ExcellParser {
  private static parseXLXS(file: any): Product[] {
    const workbook = XLSX.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
    const worksheet = workbook.Sheets[sheetName];

    // Convert worksheet to an array of objects
    const products: Product[] = XLSX.utils
      .sheet_to_json(worksheet, { header: 1 })
      .slice(1)
      .map((row: any) => ({
        title: row[0],
        description: row[1],
        price: parseFloat(row[2]),
        rating: parseFloat(row[3]),
        category: row[4],
        imageUrl: row[5],
      }));
    return products;
  }

  private static async parseCSV(file: any): Promise<Product[]> {
    const csvFileContent = file.buffer.toString("utf8");
    console.log(csvFileContent);
    return new Promise((resolve, reject) => {
      const parsedProducts: Product[] = [];

      // Create a Readable stream from the content of csvFileContent
      const readableStream = new Readable();
      readableStream._read = () => {};
      readableStream.push(csvFileContent);
      readableStream.push(null);

      // Parse the CSV file
      readableStream
        .pipe(csv())
        .on("data", (row: Product) => {
          parsedProducts.push(row);
        })
        .on("end", () => {
          console.log("CSV file successfully parsed");
          resolve(parsedProducts);
        })
        .on("error", (error) => {
          console.error("Error parsing CSV:", error.message);
          reject(error);
        });
    });
  }

  static async parser(file: any) {
    const ext = file.originalname.split(".")[1];
    if (ext === "xlsx") return this.parseXLXS(file);
    if (ext === "csv") return await this.parseCSV(file);
  }
}
