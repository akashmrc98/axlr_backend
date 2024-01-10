import ProductModel from "../../models/product.model";
import ProductServices from "../../services/product.service";

import { Request, Response } from "express";

export const getProductsController = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 40 } = req.query;
    // filtering wrapper
    const filter = await ProductServices.productFilterBuilder(req.query);
    // mongoose query with all filters and sorts
    const products = await ProductModel.find(filter)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    console.log(products);

    res.status(200).json({
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
