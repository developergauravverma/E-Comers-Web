import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import ProductUpdateForm from "../../Components/Form/ProductUpdateForm";
import { useAuth } from "../../Context/AuthContext";

const ProductsPage = () => {
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  const [product, setProduct] = useState([]);
  const [visible, setVisible] = useState(false);
  const [productId, setProductId] = useState(0);
  const [delVisible, setDelVisible] = useState(false);
  const [selected, setSelected] = useState("");

  const getProduct = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-products");
      if (data?.success) {
        let products = !data.products
          ? []
          : Array.isArray(data.products)
          ? data.products
          : [data.products];
        setProduct(products);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(`error in ProductPage error: ${error}`);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const editLink = (e) => {
    setVisible(true);
    let proId = e.target.getAttribute("data-productid");
    setProductId(proId);
  };

  const deleteLink = (e) => {
    setDelVisible(true);
    const productId = e.target.getAttribute("data-productid");
    const value = e.target.getAttribute("data-productname");
    setSelected(value);
    setProductId(productId);
  };

  const deleteHandler = async (e) => {
    try {
      const isDelete =
        e.target.getAttribute("data-value") === "yes" ? true : false;
      if (isDelete) {
        const { data } = await axios.delete(
          `/api/v1/product/delete-product/${productId}`,
          {
            userId: auth?.user?.id,
          }
        );
        if (data.success) {
          getProduct();
          toast.success("Product Deleted Successfully!");
        } else {
          toast.error(data.message);
        }
        setDelVisible(false);
      } else {
        setDelVisible(false);
      }
    } catch (error) {
      console.log(`Error in deleteHandler ${error}`);
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
            <h2>Get all product</h2>
            <div className="d-flex">
              {product?.map((x) => (
                <div key={x.Id} className="card" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:8080/${x.PhotoPath.replace(
                      "\\",
                      "/"
                    )}`}
                    className="card-img-top zoomImg"
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
                    <div>
                      <b>Price</b>: {x.Price}
                    </div>
                    <div>
                      <b>Category</b>: {x.CategoryName}
                    </div>
                    <div>
                      <b>Quantity</b>: {x.Quantity}
                    </div>
                    <Link
                      className="btn btn-primary m-1"
                      onClick={editLink}
                      data-productid={x.Id}
                    >
                      Edit
                    </Link>
                    <Link
                      className="btn btn-danger m-1"
                      onClick={deleteLink}
                      data-productid={x.Id}
                      data-productname={x.ProductName}
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
            zIndexPopupBase={1000}
          >
            <ProductUpdateForm
              productId={productId}
              setVisible={setVisible}
              updateProductList={getProduct}
            />
          </Modal>
          <Modal
            onCancel={() => setDelVisible(false)}
            footer={null}
            visible={delVisible}
            zIndexPopupBase={1000}
          >
            <div className="row">
              <div className="col-md-12 text-center">
                <div
                  className="alert alert-danger d-flex align-items-center"
                  role="alert"
                >
                  <div>
                    Are you sure to delete <u>{selected}</u> Category?
                  </div>
                </div>
              </div>
              <div className="col-md-12 text-end">
                <button
                  className="btn btn-danger m-1"
                  onClick={deleteHandler}
                  data-value="yes"
                >
                  Yes
                </button>
                <button
                  className="btn btn-primary m-1"
                  onClick={deleteHandler}
                  data-value="no"
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
