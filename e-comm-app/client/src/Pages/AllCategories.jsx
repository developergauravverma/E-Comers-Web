import React from "react";
import Layout from "../Components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const AllCategories = () => {
  const category = useCategory();
  return (
    <Layout>
      <div className="container">
        <div className="row m-3">
          <h4 className="text-center">Get All Categories</h4>
          {category?.map((value, index) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={index}>
              <Link className="btn btn-primary" to={`/category/${value.Id}`}>
                {value.CategoryName}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllCategories;
