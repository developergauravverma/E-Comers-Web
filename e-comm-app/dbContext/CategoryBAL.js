import { getDataFromDatabase } from "./DAL.js";

export const getCategoryByName = async (name) => {
  let isExists = false;
  try {
    isExists = await getDataFromDatabase(
      "sp_GetCategoryByName",
      { CategoryName: name },
      { CategoryName: "text" }
    );
  } catch (error) {
    console.log(`error in category bal getCategoryByName error: ${error}`);
  }
  return isExists;
};

export const saveCategory = async (CategoryName, slugName, userId) => {
  let newCategory = null;
  try {
    newCategory = await getDataFromDatabase(
      "sp_SaveCategory",
      {
        CategoryName: CategoryName,
        SlugCategory: slugName,
        userId: userId,
      },
      {
        CategoryName: "text",
        SlugCategory: "text",
        userId: "int",
      }
    );
  } catch (error) {
    console.log(`error in category bal saveCategory error: ${error}`);
  }
  return newCategory;
};

export const UpdateCategory = async (name, slugName, userid, categoryId) => {
  let category = null;
  try {
    category = await getDataFromDatabase(
      "sp_UpdateCategory",
      {
        CategoryName: name,
        SlugCategory: slugName,
        userId: userid,
        CategoryId: categoryId,
      },
      {
        CategoryName: "text",
        SlugCategory: "text",
        userId: "int",
        CategoryId: "int",
      }
    );
  } catch (error) {
    console.log(`error in category bal UpdateCategory error: ${error}`);
  }
  return category;
};

export const getAllCategorys = async (categoryId = 0) => {
  let allCategory = null;
  try {
    allCategory = await getDataFromDatabase(
      "sp_getCategorys",
      { CategoryId: categoryId },
      { CategoryId: "int" }
    );
  } catch (error) {
    console.log(`error in category bal UpdateCategory error: ${error}`);
  }
  return allCategory;
};

export const deleteCategory = async (categoryId, userId) => {
  let isDelete = false;
  try {
    isDelete = await getDataFromDatabase(
      "sp_deleteCategory",
      { categoryId: categoryId, userId: userId },
      {
        categoryId: "int",
        userId: "int",
      }
    );
  } catch (error) {
    console.log(`error in category bal deleteCategory error: ${error}`);
  }
  return isDelete;
};
