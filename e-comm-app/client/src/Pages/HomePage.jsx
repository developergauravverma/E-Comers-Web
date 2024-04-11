import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { PriceFilter } from "../Utils/PricesFilter";
import { useNavigate } from "react-router-dom";
import { useCard } from "../Context/CardContext";

const HomePage = () => {
  const [categorys, setCategorys] = useState();
  const [products, setProducts] = useState();
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const navigate = useNavigate();
  const [card, setCard] = useCard();

  const getProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-products");
      if (data.success) {
        let products = !data.products
          ? []
          : Array.isArray(data.products)
          ? data.products
          : [data.products];
        setProducts(products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`Error in homePage to load Product`);
    }
  };

  const getCategorys = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-Category");
      if (data.success) {
        let categorys = !data.category
          ? []
          : Array.isArray(data.category)
          ? data.category
          : [data.category];
        setCategorys(categorys);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`error in getCategory home page ${error}`);
    }
  };

  useEffect(() => {
    getCategorys();
    if (!checked.length && !radio.length) {
      getProducts();
    } else {
      getProductFilter();
    }
    // eslint-disable-next-line
  }, [checked, radio]);

  const handleCheck = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const getProductFilter = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/filter-product", {
        checked,
        radio,
      });
      if (data.success) {
        let products = !data.filterProduct
          ? []
          : Array.isArray(data.filterProduct)
          ? data.filterProduct
          : [data.filterProduct];
        setProducts(products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`error in product filter function ${error}`);
      toast.error("error in product filter function");
    }
  };

  const ProductDetailPage = (e) => {
    const productId = e.target.getAttribute("data-productid");
    navigate(`/productdetails/${productId}`);
  };

  return (
    <>
      <Layout>
        <div className="row m-2">
          <div className="col-md-3">
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categorys?.map((x) => (
                <Checkbox
                  key={x.Id}
                  onChange={(e) => {
                    handleCheck(e.target.checked, x.Id);
                  }}
                >
                  <label>{x.CategoryName}</label>
                </Checkbox>
              ))}
            </div>
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              >
                {PriceFilter?.map((x) => (
                  <div key={x.id}>
                    <Radio value={x.array}>{x.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Product</h1>
            <div className="d-flex flex-wrap">
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
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
