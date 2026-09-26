import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || true,
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "An E-commerce application's API" });
});

app.use("/api/products", async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use("/api/products", productRoutes);

app.use(errorHandler);

export default app;
