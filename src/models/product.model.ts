import mongoose, { Schema } from "mongoose";

export interface Product {
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
  rating: number;
}

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
});

const ProductModel = mongoose.model<Product>("Product", productSchema);

export default ProductModel;
