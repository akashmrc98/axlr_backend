import mongoose, { Schema } from "mongoose";

export interface Product {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
  rating: number;
}

const productSchema = new Schema<Product>({
  title: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
});

const ProductModel = mongoose.model<Product>("Product", productSchema);

export default ProductModel;
