import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const param = useParams();
  const [product, setProduct] = useState();
  const navigate = useNavigate();

  const getProduct = async (productId) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-products/${productId}`
      );
      if (data.success) {
        setProduct(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`error come in Product Details Page : ${error}`);
    }
  };

  useEffect(() => {
    debugger;
    getProduct(param.productId);
  }, [param]);

  return (
    <>
      <Layout>
        <div className="container py-5">
          <div className="row">
            <h3 className="text-center">Product Details</h3>
            <div className=" col-md-4">
              <img
                className="img img-thumbnail"
                src={`http://localhost:8080/${product?.PhotoPath?.replaceAll(
                  "\\",
                  "/"
                )}`}
                alt="not found"
              />
            </div>
            <div className="col-md-8">
              <div className="row g-2 align-items-center">
                <div className="col-3">
                  <label className="col-form-lable">
                    <h5>Name:</h5>
                  </label>
                </div>
                <div className="col-9">
                  <label className="col-form-lable">
                    <h5>{product?.ProductName}</h5>
                  </label>
                </div>
                <div className="col-3">
                  <label className="col-form-lable">
                    <h5>Description:</h5>
                  </label>
                </div>
                <div className="col-9">
                  <label className="col-form-lable">
                    <h5>{product?.Description}</h5>
                  </label>
                </div>
                <div className="col-3">
                  <label className="col-form-lable">
                    <h5>Price:</h5>
                  </label>
                </div>
                <div className="col-9">
                  <label className="col-form-lable">
                    <h5>Rs. {product?.Price}</h5>
                  </label>
                </div>
                <div className="col-3">
                  <label className="col-form-lable">
                    <h5>Category:</h5>
                  </label>
                </div>
                <div className="col-9">
                  <label className="col-form-lable">
                    <h5>{product?.CategoryName}</h5>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-6 text-center">
                  <button className="btn btn-secondary m-3">Add To Cart</button>
                  <button
                    className="btn btn-primary m-3"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/");
                    }}
                  >
                    Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductDetails;
