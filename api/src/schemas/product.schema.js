import { z } from "zod";

export const productQuerySchema = z.object({
  search: z.string().trim().optional(),

  category: z.enum(["2-piece", "3-piece"]).optional(),

  minPrice: z.coerce.number().min(0).optional(),

  maxPrice: z.coerce.number().min(0).optional(),

  sort: z
    .enum(["relevance", "az", "za", "price-low", "price-high"])
    .default("relevance"),
});
