import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../Components/Form/CategoryForm";
import { useAuth } from "../../Context/AuthContext";

const CreateCategory = () => {
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  const [category, setCategory] = useState([]);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-Category");
      if (data.success) {
        setCategory(data.category);
        setCount(data.category.length);
        toast.success("Get Category Successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(`error in getAllCategory : ${error}`);
      toast.error("Error Occurred! Please Try Again");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    debugger;
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        categoryName: name,
        userId: auth?.user?.id,
      });
      if (data?.success) {
        toast.success(`${data.newCategory.CategoryName} is created.`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error in Create Category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Category</h1>
            <div>
              <CategoryForm
                category={name}
                setCategory={setName}
                submitHandler={submitHandler}
              />
            </div>
            <div>
              <table className="table table-sm table-striped table-bordered admin-table">
                <caption>List of category {count}</caption>
                <thead>
                  <tr>
                    <th>Category Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((x) => (
                    <tr key={x.Id}>
                      <td>{x.CategoryName}</td>
                      <td>
                        <button className="btn btn-primary">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
