import React from "react";
import Layout from "../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <div
          className="container-fluid d-flex flex-column align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <h1 className="display-1 text-danger">404</h1>
          <p className="lead text-muted">Page not found</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go Back
          </button>
        </div>
      </Layout>
    </>
  );
};

export default PageNotFound;
