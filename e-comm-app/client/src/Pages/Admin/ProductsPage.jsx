import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import ProductUpdateForm from "../../Components/Form/ProductUpdateForm";

const ProductsPage = () => {
  const [product, setProduct] = useState([]);
  const [visible, setVisible] = useState(false);
  const [productId, setProductId] = useState(0);

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
                    className="card-img-top"
                    alt="default"
                    style={{ height: "15rem", width: "100%" }}
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
                      className="btn btn-primary"
                      onClick={editLink}
                      data-productid={x.Id}
                    >
                      Edit
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
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
