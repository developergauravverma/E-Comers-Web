import slugify from "slugify";
import {
  CreateProduct,
  GetProducts,
  deleteProduct,
  UpdateProduct,
} from "../dbContext/ProductBAL.js";
import fs from "fs";

export const CreateProductController = async (req, res) => {
  try {
    const { name, description, price, categoryId, quantity, userId } = req.body;
    const photo = req.file;

    switch (true) {
      case !name:
        return (
          res.send({ message: "Product Name is required." }) ||
          (await fs.unlinkSync(photo.path))
        );
      case !description:
        return (
          res.send({ message: "Product description is required." }) ||
          (await fs.unlinkSync(photo.path))
        );
      case !price:
        return (
          res.send({ message: "Product price is required." }) ||
          (await fs.unlinkSync(photo.path))
        );
      case !categoryId:
        return (
          res.send({ message: "Product category is required." }) ||
          (await fs.unlinkSync(photo.path))
        );
      case !quantity:
        return (
          res.send({ message: "Product quantity is required." }) ||
          (await fs.unlinkSync(photo.path))
        );
      case !photo:
        return (
          res.send({ message: "Product image is required." }) ||
          (await fs.unlinkSync(photo.path))
        );
    }

    if (!photo && !photo.filename && !photo.path) {
      await fs.unlinkSync(photo.path);
      return res.send({
        success: false,
        message: "Product Image not uploaded.",
      });
    }

    const slug = slugify(name);

    const values = {
      ...req.body,
      slug: slug,
      ImagePath: photo.path,
      userId: userId,
    };

    const product = await CreateProduct(values);

    if (!product) {
      await fs.unlinkSync(photo.path);
      return res.send({
        success: false,
        message: `Product not created`,
      });
    }

    return res.send({
      success: true,
      message: `Product created`,
      product,
    });
  } catch (error) {
    console.log(
      `error in product controller productUploadImageController ${error}`
    );
    await fs.unlinkSync(photo.path);
    res.send({
      success: false,
      message: "error in product controller productUploadImageController",
      error,
    });
  }
};

export const GetProductController = async (req, res) => {
  try {
    const products = await GetProducts();
    if (!products) {
      return res.send({
        success: false,
        message: "you don't have any product",
      });
    }
    return res.send({
      success: true,
      message: "All product",
      products,
    });
  } catch (error) {
    console.log(`error in product controller GetProductController ${error}`);
    return res.send({
      success: false,
      message: "error in product controller GetProductController",
      error,
    });
  }
};

export const GetProductByIdController = async (req, res) => {
  const { productId } = req.params;
  try {
    const products = await GetProducts(productId);
    if (!products) {
      return res.send({
        success: false,
        message: "you don't have any product on this id",
      });
    }
    return res.send({
      success: true,
      message: "Product by id",
      products,
    });
  } catch (error) {
    console.log(
      `error in product controller GetProductByIdController ${error}`
    );
    return res.send({
      success: false,
      message: "error in product controller GetProductByIdController",
      error,
    });
  }
};

export const DeleteProductByIdController = async (req, res) => {
  const { productId } = req.params;
  try {
    const { isDelete, imagePath } = await deleteProduct(productId);
    if (!isDelete) {
      return res.send({
        success: false,
        message: "you don't have any product on this id",
      });
    }
    if (!imagePath) {
      return res.send({
        success: false,
        message: "you don't have any product on this id",
      });
    }
    await fs.unlinkSync(imagePath); //delete the file from server
    return res.send({
      success: true,
      message: "Product deleted by id",
    });
  } catch (error) {
    console.log(
      `error in product controller DeleteProductByIdController ${error}`
    );
    return res.send({
      success: false,
      message: "error in product controller DeleteProductByIdController",
      error,
    });
  }
};

export const UpdateProductByIdController = async (req, res) => {
  try {
    const { name, description, price, categoryId, quantity, userId } = req.body;
    const { productId } = req.params;
    const photo = req.file;

    switch (true) {
      case !name:
        return (
          res.send({ message: "Product Name is required." }) ||
          (await fs.unlinkSync(photo.path))
        );
      case !description:
        return (
          res.send({ message: "Product description is required." }) ||
          (await fs.unlinkSync(photo.path))
        );
      case !price:
        return (
          res.send({ message: "Product price is required." }) ||
          (await fs.unlinkSync(photo.path))
        );
      case !categoryId:
        return (
          res.send({ message: "Product category is required." }) ||
          (await fs.unlinkSync(photo.path))
        );
      case !quantity:
        return (
          res.send({ message: "Product quantity is required." }) ||
          (await fs.unlinkSync(photo.path))
        );
      case !photo:
        return (
          res.send({ message: "Product image is required." }) ||
          (await fs.unlinkSync(photo.path))
        );
    }

    if (!photo && !photo.filename && !photo.path) {
      await fs.unlinkSync(photo.path);
      return res.send({
        success: false,
        message: "Product Image not uploaded.",
      });
    }

    const slug = slugify(name);

    const values = {
      ...req.body,
      slug: slug,
      ImagePath: photo.path,
      userId: userId,
    };

    const updatedProduct = await GetProducts(productId);

    const newProduct = {
      id: updatedProduct.Id,
      name: updatedProduct.ProductName,
      slug: slugify(updatedProduct.ProductName),
      description: updatedProduct.Description,
      price: updatedProduct.Price,
      categoryId: updatedProduct.CategoryId,
      quantity: updatedProduct.Quantity,
      ImagePath: updatedProduct.PhotoPath,
      userId: updatedProduct.CreatedBy,
    };

    let version1 = {
      ...values,
      [newProduct.key]: newProduct.value,
    };

    const { isUpdate } = await UpdateProduct(version1);

    await fs.unlinkSync(newProduct.ImagePath);
    if (!isUpdate) {
      await fs.unlinkSync(photo.path);
      return res.send({
        success: false,
        message: `Product not updated`,
      });
    }

    return res.send({
      success: true,
      message: `Product updated`,
      version1,
    });
  } catch (error) {
    console.log(
      `error in product controller UpdateProductByIdController ${error}`
    );
    await fs.unlinkSync(photo.path);
    res.send({
      success: false,
      message: "error in product controller UpdateProductByIdController",
      error,
    });
  }
};
