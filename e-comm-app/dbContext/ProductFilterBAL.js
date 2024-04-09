import { getDataFromDatabase } from "./DAL.js";

export const FilterByCategoryAndPrice = async (check, radio) => {
  let product = null;
  try {
    product = await getDataFromDatabase(
      "sp_FilterProduct",
      { Check: check, Radio: radio },
      { Check: "text", Radio: "text" }
    );
  } catch (error) {
    console.log(`error in Product filter BAL : ${error}`);
  }
  return product;
};

export const RelatedProductBAL = async (cid, pid) => {
  let relatedProduct = null;
  try {
    relatedProduct = await getDataFromDatabase(
      "sp_RelatedProduct",
      {
        cid: cid,
        pid: pid,
      },
      {
        cid: "int",
        pid: "int",
      }
    );
  } catch (error) {
    console.log(error);
  }
  return relatedProduct;
};
