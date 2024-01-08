import csv from "csv-parser";
import { Readable } from "stream";
import { Product } from "../models/product.model";

import ProductModel from "../models/product.model";

export class ProductServices {
  static async rankingAlogoritham() {
    // get all the data
    const products = await ProductModel.find();
  }
}
