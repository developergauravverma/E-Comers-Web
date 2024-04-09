import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import useCategory from "../hooks/useCategory";
import { useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const param = useParams();
  const [products, setProducts] = useState([]);
  const categories = useCategory();
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  const getAllProductByCategoryId = async (cid) => {
    try {
      debugger;
      const { data } = await axios.get(
        `/api/v1/product/product-category/${cid}`
      );
      if (data.success) {
        let products = !data.products
          ? []
          : Array.isArray(data.products)
          ? data.products
          : [data.products];
        setProducts(products);
        setCategory(categories.find((x) => x.Id === parseInt(cid)));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`error in load getAllProductByCategoryId : ${error}`);
    }
  };

  useEffect(() => {
    getAllProductByCategoryId(param.cid);
    // eslint-disable-next-line
  }, [param, categories]);

  const ProductDetailPage = (e) => {
    const productId = e.target.getAttribute("data-productid");
    navigate(`/productdetails/${productId}`);
  };

  return (
    <Layout>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12 text-center">
            <h4>Category Name: {category?.CategoryName}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <h4>Result Found: {products?.length}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-start mb-3">
              {products?.map((x) => (
                <div key={x.Id} className="card m-1" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:8080/${x.PhotoPath.replace(
                      "\\",
                      "/"
                    )}`}
                    className="img img-thumbnail"
                    alt="default"
                    style={{
                      height: "15rem",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{x.ProductName}</h5>
                    <p
                      className="card-text"
                      style={{ height: "5rem", overflow: "auto" }}
                    >
                      {x.Description}
                    </p>
                    <button
                      className="btn btn-primary m-1 float-start"
                      onClick={ProductDetailPage}
                      data-productid={x.Id}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary m-1 float-end">
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
