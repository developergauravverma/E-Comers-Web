import { getDataFromDatabase } from "./DAL.js";

export const CreateProduct = async (param) => {
  let product = null;
  try {
    product = await getDataFromDatabase(
      "sp_insertProduct",
      {
        Name: param.name,
        Description: param.description,
        Slug: param.slug,
        Price: param.price,
        CategoryId: param.categoryId,
        Quantity: param.quantity,
        PhotoPath: param.ImagePath,
        userId: param.userId,
        Shipping: param.shipping,
      },
      {
        Name: "text",
        Description: "text",
        Slug: "text",
        Price: "int",
        CategoryId: "int",
        Quantity: "int",
        PhotoPath: "text",
        userId: "int",
        Shipping: "text",
      }
    );
    // Validate the input parameters
  } catch (error) {
    console.log(`error in product bal CreateProduct ${error}`);
  }
  return product;
};

export const GetProducts = async (productId = 0) => {
  let allProducts = null;
  try {
    allProducts = await getDataFromDatabase(
      "sp_GetAllProduct",
      {
        productId: productId,
      },
      {
        productId: "int",
      }
    );
  } catch (error) {
    console.log(`error in product bal CreateProduct ${error}`);
  }
  return allProducts;
};

export const deleteProduct = async (productId = 0) => {
  let isdelete = null;
  try {
    isdelete = await getDataFromDatabase(
      "sp_DeleteProductById",
      { productId: productId },
      { productId: "int" }
    );
  } catch (error) {
    console.log(`error in product bal deleteProduct ${error}`);
  }
  return isdelete;
};

export const UpdateProduct = async (newProduct) => {
  let updatedProdcut = null;
  try {
    updatedProdcut = await getDataFromDatabase(
      "sp_UpdateProduct",
      {
        Name: newProduct.name,
        Slug: newProduct.slug,
        Description: newProduct.description,
        Price: newProduct.price,
        CategoryId: newProduct.categoryId,
        Quantity: newProduct.quantity,
        PhotoPath: newProduct.ImagePath,
        userId: newProduct.userId,
        productId: newProduct.id,
        Shipping: newProduct.shipping,
      },
      {
        Name: "text",
        Slug: "text",
        Description: "text",
        Price: "int",
        CategoryId: "int",
        Quantity: "int",
        PhotoPath: "text",
        userId: "int",
        productId: "int",
        Shipping: "text",
      }
    );
  } catch (error) {
    console.log(`error in product bal UpdateProduct ${error}`);
  }
  return updatedProdcut;
};
