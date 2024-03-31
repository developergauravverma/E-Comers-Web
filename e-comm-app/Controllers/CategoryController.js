import slugify from "slugify";
import {
  getCategoryByName,
  saveCategory,
  UpdateCategory,
  getAllCategorys,
  deleteCategory,
} from "../dbContext/CategoryBAL.js";

export const CreateCategoryController = async (req, res) => {
  try {
    const { categoryName, userId } = req.body;
    if (!categoryName) {
      return res.send({
        success: false,
        message: "category name is null or Empty.",
      });
    }
    const { isExists } = await getCategoryByName(categoryName);
    if (isExists) {
      return res.send({
        success: false,
        message: "this category is exists",
      });
    }
    const slugCategory = slugify(categoryName);
    const newCategory = await saveCategory(categoryName, slugCategory, userId);
    if (!newCategory) {
      return res.send({
        success: false,
        message: "category is not Created",
      });
    }
    return res.send({
      success: true,
      message: "category is Created",
      newCategory,
    });
  } catch (error) {
    console.log(`error in CreateCategoryController ${error}`);
    res.send({
      success: false,
      message: "something went wrong in CreateCategoryController.",
      error,
    });
  }
};

export const UpdateCategoryController = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const { categoryId } = req.params;
    const slugName = slugify(name);
    if (!categoryId) return res.send({ message: "Please enter Category Id" });
    if (!name) return res.send({ message: "Please enter Category Name" });
    const category = await UpdateCategory(name, slugName, userId, categoryId);
    if (!category) {
      return res.send({
        success: false,
        message: "category is not updated.",
      });
    }
    return res.send({
      success: true,
      message: "category is updated.",
      category,
    });
  } catch (error) {
    console.log(`error in UpdateCategoryController ${error}`);
    return res.send({
      success: false,
      message: "something went wrong in UpdateCategoryController.",
      error,
    });
  }
};

export const getCategorysController = async (req, res) => {
  try {
    const category = await getAllCategorys();
    return res.send({
      success: true,
      message: "All categorys",
      category,
    });
  } catch (error) {
    console.log(`error in getCategorysController ${error}`);
    return res.send({
      success: false,
      message: "something went wrong in getCategorysController.",
      error,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await getAllCategorys(categoryId);
    return res.send({
      success: true,
      message: "All categorys",
      category,
    });
  } catch (error) {
    console.log(`error in getCategorysController ${error}`);
    return res.send({
      success: false,
      message: "something went wrong in getCategoryById.",
      error,
    });
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { userId } = req.body;
    const { isDeleted } = await deleteCategory(categoryId, userId);
    if (!isDeleted) {
      return res.send({
        success: false,
        message: "Category is not deleted",
        error,
      });
    }
    return res.send({
      success: true,
      message: "Category is deleted",
    });
  } catch (error) {
    console.log(`error in deleteCategoryById ${error}`);
    return res.send({
      success: false,
      message: "something went wrong in deleteCategoryById.",
      error,
    });
  }
};
