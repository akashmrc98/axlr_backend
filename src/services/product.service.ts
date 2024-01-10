import DB from "../models/db";

export default class ProductServices {
  static productFilterBuilder = async (
    input: any
  ): Promise<Record<string, any>> => {
    try {
      const {
        query: searchTerm,
        minPrice,
        maxPrice,
        rating,
      } = input as Record<string, string | number>;

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
      // retrives little relavents
      if (searchTerm) filter.$text = { $search: searchTerm.toString().trim() };
      return filter;
    } catch (error) {
      return {};
    }
  };
}
