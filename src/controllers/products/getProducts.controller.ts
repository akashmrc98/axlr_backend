import { Request, Response } from "express";
import ProductModel from "../../models/product.model";
import { ProductServices } from "../../services/products.service";

export const getProductsController = async (req: Request, res: Response) => {
  try {
    const {
      query: searchTerm,
      minPrice,
      maxPrice,
      rating,
      page = 1,
      limit = 40,
    } = req.query as Record<string, string | number>;

    const filter: Record<string, any> = {};
    // Adding price range condition
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    // Adding rating condition
    if (rating) {
      filter.rating = {};
      filter.rating.$gte = Number(rating);
    }
    // searchTerm
    if (searchTerm) filter.$text = { $search: searchTerm.toString().trim() };

    // mongoose query with all filters and sorts
    const products = await ProductModel.find(filter)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    // pagination data
    const totalProducts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / Number(limit));
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);

    res.status(200).json({
      products,
      pagination: {
        totalProducts,
        totalPages,
        pages,
        currentPage: Number(page),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
