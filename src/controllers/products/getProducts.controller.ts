import { Request, Response } from "express";
import ProductModel from "../../models/product.model";

export const getProductsController = async (req: Request, res: Response) => {
  try {
    const {
      query: searchTerm,
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 40,
    } = req.query as Record<string, string | number>;
    const filter: Record<string, any> = {};
    if (searchTerm) {
      const searchTermString = searchTerm.toString();
      // Ensure searchTerm is a string
      filter.$or = [
        { title: { $regex: new RegExp(searchTermString, "i") } },
        { category: { $regex: new RegExp(searchTermString, "i") } },
        { description: { $regex: new RegExp(searchTermString, "i") } },
      ];
    }
    // Adding category condition
    if (category)
      filter.category = { $regex: new RegExp(category as string, "i") };

    // Adding price range condition
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await ProductModel.find(filter)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const totalProducts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / Number(limit));

    res.status(200).json({
      products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: Number(page),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
