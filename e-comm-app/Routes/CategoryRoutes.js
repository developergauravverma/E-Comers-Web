import express from "express";
import {
  CreateCategoryController,
  UpdateCategoryController,
  getCategorysController,
  getCategoryById,
  deleteCategoryById,
} from "../Controllers/CategoryController.js";
import { isAdmin, requireSignIn } from "../Middleware/AuthMiddleware.js";

const routes = express.Router();

routes.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  CreateCategoryController
);

routes.put(
  "/update-category/:categoryId",
  requireSignIn,
  isAdmin,
  UpdateCategoryController
);

routes.get("/get-Category", getCategorysController);
routes.get("/get-CategoryById/:categoryId", getCategoryById);
routes.delete(
  "/delete-CategoryById/:categoryId",
  requireSignIn,
  isAdmin,
  deleteCategoryById
);

export default routes;
