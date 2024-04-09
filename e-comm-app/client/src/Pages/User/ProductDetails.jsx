import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useCard } from "../../Context/CardContext";

const ProductDetails = () => {
  const param = useParams();
  const [product, setProduct] = useState();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [card, setCard] = useCard();

  const getProduct = async (productId) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-products/${productId}`
      );
      if (data.success) {
        setProduct(data.products);
        await getSimilarProduct(data.products.CategoryId, data.products.Id);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`error come in Product Details Page : ${error}`);
    }
  };

  const getSimilarProduct = async (cid, pid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-products/${cid}/${pid}`
      );
      if (data.success) {
        let products = !data.relatedProduct
          ? []
          : Array.isArray(data.relatedProduct)
          ? data.relatedProduct
          : [data.relatedProduct];
        setProducts(products);
      }
    } catch (error) {
      console.log(`error in getSimilarProduct : ${error}`);
    }
  };

  useEffect(() => {
    debugger;
    getProduct(param.productId);
    // eslint-disable-next-line
  }, [param]);

  const ProductDetailPage = (e) => {
    const productId = e.target.getAttribute("data-productid");
    navigate(`/productdetails/${productId}`);
  };

  return (
    <>
      <Layout>
        <div className="container py-5">
          <div className="row m-4">
            <h3 className="text-center">Product Details</h3>
            <div className=" col-md-4">
              <img
                className="img img-thumbnail"
                src={`http://localhost:8080/${product?.PhotoPath?.replaceAll(
                  "\\",
                  "/"
                )}`}
                alt="not found"
                style={{ height: "360px" }}
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
          <div className="row m-4">
            <div className="col-md-12 text-center">
              <h4>Similar Product</h4>
              {products.length === 0 ? (
                <h3>Similar Product Not Found</h3>
              ) : (
                products.map((x) => (
                  <div
                    key={x.Id}
                    className="card m-1"
                    style={{ width: "18rem" }}
                  >
                    <img
                      src={`http://localhost:8080/${x.PhotoPath.replace(
                        "\\",
                        "/"
                      )}`}
                      className="img img-thumbnail"
                      alt="default"
                      style={{
                        height: "360px",
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
                      <button
                        className="btn btn-secondary m-1 float-end"
                        onClick={() => {
                          toast.success("item add in to Cart Successfully!");
                          setCard([...card, x]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...card, x])
                          );
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductDetails;
