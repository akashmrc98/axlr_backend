export default class ProductServices {
  static productFilterBuilder = async (
    input: any
  ): Promise<Record<string, any>> => {
    try {
      const {
        query: searchTerm,
        category,
        minPrice,
        maxPrice,
        rating,
      } = input as Record<string, string | number>;

      console.log(input)

      const filter: Record<string, any> = {};
      // Adding price range condition
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }


      // Added category based condition 
      if (category) {
        const re = new RegExp(category.toString().trim(), 'i');
        filter.category = { $regex: re }
      }

      // Adding rating condition
      if (rating) {
        filter.rating = {};
        filter.rating.$gte = Number(rating);
      }

      // searchTerm
      // retrives little relavents
      if (searchTerm) filter.$text = { $search: searchTerm.toString().trim() };
      console.log(filter)
      return filter;
    } catch (error) {
      return {};
    }
  };
}
