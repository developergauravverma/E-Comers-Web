import {
  FilterByCategoryAndPrice,
  RelatedProductBAL,
  GetProductByCategoryIdBAL,
} from "../dbContext/ProductFilterBAL.js";

export const FilterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let checkedSeprated = null;
    let radioSeprated = null;
    if (checked) {
      checkedSeprated = checked.join(",");
    }
    if (radio) {
      radioSeprated = radio.join(",");
    }
    const filterProduct = await FilterByCategoryAndPrice(
      checkedSeprated,
      radioSeprated
    );
    res.send({
      success: true,
      message: "Product filter by Category Name and Price",
      filterProduct,
    });
  } catch (error) {
    console.log(`error in filter controller : ${error}`);
    res.send({
      success: false,
      message: "error in filter controller",
      error,
    });
  }
};

export const RelatedProductController = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const relatedProduct = await RelatedProductBAL(cid, pid);
    if (!relatedProduct) {
      return res.send({
        success: false,
        message: "No product is available for this category",
      });
    }
    return res.send({
      success: true,
      message: "Similar Product are found",
      relatedProduct,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: `something went wrong in RelatedProductController`,
      error,
    });
  }
};

export const GetProductByCategoryId = async (req, res) => {
  try {
    const { cid } = req.params;
    const products = await GetProductByCategoryIdBAL(cid);
    if (!products) {
      return res.send({
        success: false,
        message: "No product is available under this Category",
      });
    }
    return res.send({
      success: true,
      message: "Products are fetched successfully.",
      products,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "Error In GetProductByCategoryId Controller",
      error,
    });
  }
};
