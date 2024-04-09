import { FilterByCategoryAndPrice } from "../dbContext/ProductFilterBAL.js";

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
