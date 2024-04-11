import { Layout } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useAuth } from "../../Context/AuthContext";

const { Option } = Select;

const ProductUpdateForm = ({ productId, setVisible, updateProductList }) => {
  const [allCategory, setAllCategory] = useState([]);
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  const [category, setCategory] = useState(null);
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: 0,
    categoryId: 0,
    categoryName: "",
    shipping: "",
    quantity: 0,
    photoPath: "",
  });

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-Category");
      if (data?.success) {
        let categorys = !data.category
          ? []
          : Array.isArray(data.category)
          ? data.category
          : [data.category];
        setAllCategory(categorys);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(`error in getAllCategory : ${error}`);
      toast.error("Error Occurred! Please Try Again");
    }
  };

  const getProductById = async (productId) => {
    try {
      const { data } = await axios(`/api/v1/product/get-products/${productId}`);
      if (data.success) {
        let prop = {
          productName: data.products.ProductName,
          description: data.products.Description,
          price: data.products.Price,
          categoryId: data.products.CategoryId,
          categoryName: data.products.CategoryName,
          shipping: data.products.Shipping,
          quantity: data.products.Quantity,
          photoPath: data.products.PhotoPath.replaceAll("\\", "/"),
        };
        setProduct(prop);
      }
    } catch (error) {
      console.log(`Error in edit product : ${error}`);
    }
  };

  useEffect(() => {
    getAllCategory();
    getProductById(productId);
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const categoryId = allCategory.find(
        (x) => x.CategoryName === (!category ? product.categoryName : category)
      ).Id;
      const productData = new FormData();
      productData.append("name", product.productName);
      productData.append("description", product.description);
      productData.append("price", product.price);
      productData.append("categoryId", categoryId);
      productData.append("quantity", product.quantity);
      productData.append("userId", auth?.user?.id);
      productData.append("shipping", product.shipping);
      productData.append("photo", product.photoPath);
      const { data } = await axios.put(
        `/api/v1/product/update-product/${productId}`,
        productData
      );
      if (data.success) {
        toast.success(data.message);
        setVisible(false);
        updateProductList();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`error in product submitHandler error: ${error}`);
    }
  };
  console.log(product.photoPath);
  return (
    <Layout>
      <h1>Update Product</h1>
      <div className="m-1">
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            className="form-control"
            placeholder="Enter product name"
            type="text"
            onChange={(e) => {
              setProduct({ ...product, productName: e.target.value });
            }}
            value={product.productName}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Description</label>
          <textarea
            className="form-control"
            placeholder="Enter product Description"
            onChange={(e) => {
              setProduct({ ...product, description: e.target.value });
            }}
            rows="4"
            cols="50"
            value={product.description}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Product Price</label>
          <input
            className="form-control"
            placeholder="Enter product Price"
            type="number"
            onChange={(e) => {
              setProduct({ ...product, price: e.target.value });
            }}
            value={product.price}
          />
        </div>
        <label className="form-label">Product Category</label>
        <Select
          placeholder="Select a Category"
          size="Medium"
          bordered={false}
          showSearch
          className="form-select mb-3"
          onChange={(value) => {
            setCategory(value);
          }}
          value={product.categoryName}
        >
          {allCategory?.map((x) => (
            <Option key={x.Id} value={x.CategoryName}>
              {x.CategoryName}
            </Option>
          ))}
        </Select>
        <div className="mb-3">
          <label className="form-label">Product Quantity</label>
          <input
            className="form-control"
            placeholder="Enter product Quantity"
            type="number"
            onChange={(e) => {
              setProduct({ ...product, quantity: e.target.value });
            }}
            value={product.quantity}
          />
        </div>
        <label className="form-label">Product Shipping</label>
        <Select
          placeholder="Select Shipping"
          size="Medium"
          bordered={false}
          showSearch
          className="form-select mb-3"
          onChange={(value) => {
            setProduct({ ...product, shipping: value });
          }}
          value={product.shipping}
        >
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
        <div className="mb-3">
          <label className="btn btn-outline-secondary col-md-12">
            {product.photoPath
              ? !product.photoPath.name
                ? product?.photoPath?.split("/")[2]
                : product.photoPath.name
              : "Upload Image"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => {
                setProduct({ ...product, photoPath: e.target.files[0] });
              }}
              hidden
            />
          </label>
        </div>
        <div className="mb-3">
          {product?.photoPath && (
            <div className="text-center">
              <img
                src={
                  product?.photoPath.name
                    ? URL.createObjectURL(product?.photoPath)
                    : `http://localhost:8080/${product?.photoPath}`
                }
                alt="product_Photo"
                className="img img-responsive"
                style={{ height: "40vh", width: "25vw" }}
              />
            </div>
          )}
        </div>
        <button className="btn btn-primary" onClick={submitHandler}>
          Update Product
        </button>
      </div>
    </Layout>
  );
};

export default ProductUpdateForm;
