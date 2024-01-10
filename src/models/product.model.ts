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

productSchema.index({ title: "text", category: "text", description: "text" });
productSchema.index({ title: 1 });
productSchema.index({ category: 1 });
productSchema.index({ description: 1 });

const ProductModel = mongoose.model<Product>("Product", productSchema);

export default ProductModel;
