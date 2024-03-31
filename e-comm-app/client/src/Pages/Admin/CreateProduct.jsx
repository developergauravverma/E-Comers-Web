import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
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
    Quantity: 0,
    photoPath: "",
  });

  const navigate = useNavigate();

  // const getAllProduct = async () => {
  //   try {
  //     const { data } = axios.get("/api/v1/product/get-products");
  //     if (data.success) {
  //       toast.success(data.message);
  //       setAllProduct(data.products);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log(`Error in getAllProduct error: ${error}`);
  //     toast.error("error in getAllProduct");
  //   }
  // };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-Category");
      if (data?.success) {
        setAllCategory(data?.category);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(`error in getAllCategory : ${error}`);
      toast.error("Error Occurred! Please Try Again");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const submitHandler = async (e) => {
    debugger;
    e.preventDefault();
    try {
      const categoryId = allCategory.find(
        (x) => x.CategoryName === category
      ).Id;
      const productData = new FormData();
      productData.append("name", product.productName);
      productData.append("description", product.description);
      productData.append("price", product.price);
      productData.append("categoryId", categoryId);
      productData.append("quantity", product.Quantity);
      productData.append("userId", auth?.user?.id);
      productData.append("shipping", product.shipping);
      productData.append("photo", product.photoPath);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/dashbord/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`error in product submitHandler error: ${error}`);
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Enter product name"
                  type="text"
                  onChange={(e) => {
                    setProduct({ ...product, productName: e.target.value });
                  }}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Enter product Description"
                  onChange={(e) => {
                    setProduct({ ...product, description: e.target.value });
                  }}
                  rows="4"
                  cols="50"
                ></textarea>
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Enter product Price"
                  type="number"
                  onChange={(e) => {
                    setProduct({ ...product, price: e.target.value });
                  }}
                />
              </div>
              <Select
                placeholder="Select a Category"
                size="Medium"
                bordered={false}
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {allCategory?.map((x) => (
                  <Option key={x.Id} value={x.CategoryName}>
                    {x.CategoryName}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Enter product Quantity"
                  type="number"
                  onChange={(e) => {
                    setProduct({ ...product, Quantity: e.target.value });
                  }}
                />
              </div>
              <Select
                placeholder="Select Shipping"
                size="Medium"
                bordered={false}
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setProduct({ ...product, shipping: value });
                }}
              >
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {product.photoPath ? product.photoPath.name : "Upload Image"}
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
                      src={URL.createObjectURL(product?.photoPath)}
                      alt="product_Photo"
                      className="img img-responsive"
                      style={{ height: "40vh", width: "25vw" }}
                    />
                  </div>
                )}
              </div>
              <button className="btn btn-primary" onClick={submitHandler}>
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
