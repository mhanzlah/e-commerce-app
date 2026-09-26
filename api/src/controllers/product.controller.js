import Product from "../models/Product.js";
import { productQuerySchema } from "../schemas/product.schema.js";

export async function getProducts(req, res, next) {
  try {
    const parsed = productQuerySchema.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid query parameters",
        errors: parsed.error.flatten(),
      });
    }

    const { search, category, minPrice, maxPrice, sort } = parsed.data;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};

      if (minPrice !== undefined) {
        filter.price.$gte = minPrice;
      }

      if (maxPrice !== undefined) {
        filter.price.$lte = maxPrice;
      }
    }

    if (search) {
      filter.$text = {
        $search: search,
      };
    }

    let query = Product.find(filter);

    switch (sort) {
      case "az":
        query = query.sort({ name: 1 });
        break;

      case "za":
        query = query.sort({ name: -1 });
        break;

      case "price-low":
        query = query.sort({ price: 1 });
        break;

      case "price-high":
        query = query.sort({ price: -1 });
        break;

      case "relevance":
      default:
        if (search) {
          query = query
            .select({
              score: { $meta: "textScore" },
            })
            .sort({
              score: { $meta: "textScore" },
            });
        } else {
          query = query.sort({
            popularity: -1,
            createdAt: -1,
          });
        }
    }

    const products = await query.lean();

    res.json({
      products,
      count: products.length,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProductBySlug(req, res, next) {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
    }).lean();

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
}
