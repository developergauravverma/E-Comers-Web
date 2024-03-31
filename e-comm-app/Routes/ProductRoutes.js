import express from "express";
import {
  CreateProductController,
  GetProductController,
  GetProductByIdController,
  DeleteProductByIdController,
  UpdateProductByIdController,
} from "../Controllers/ProductController.js";
import uploadImage from "../Middleware/ImageMiddleware.js";
import { requireSignIn, isAdmin } from "../Middleware/AuthMiddleware.js";

const routes = express.Router();

routes.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  uploadImage,
  CreateProductController
);
routes.get("/get-products", GetProductController);
routes.get("/get-products/:productId", GetProductByIdController);
routes.delete(
  "/delete-product/:productId",
  requireSignIn,
  isAdmin,
  DeleteProductByIdController
);
routes.put(
  "/update-product/:productId",
  requireSignIn,
  isAdmin,
  uploadImage,
  UpdateProductByIdController
);

export default routes;
