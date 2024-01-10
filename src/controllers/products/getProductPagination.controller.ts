import { Request, Response } from "express";
import ProductModel from "../../models/product.model";
import ProductServices from "../../services/product.service";

export const getProductsPaginationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { page = 1, limit = 40 } = req.query;
    // filtering wrapper
    const filter = await ProductServices.productFilterBuilder(req.query);
    // pagination data
    const totalProducts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / Number(limit));
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    const pagination = {
      totalProducts,
      totalPages,
      pages,
      currentPage: Number(page),
    };
    console.log(pagination);
    res.status(200).json({ pagination });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
