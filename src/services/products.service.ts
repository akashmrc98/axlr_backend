import csv from "csv-parser";
import { Readable } from "stream";
import { Product } from "../models/product.model";

export class ProductServices {
  static parseCSV(csvFileContent: string): Promise<Product[]> {
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
}
