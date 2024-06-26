import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../Components/Form/CategoryForm";
import { useAuth } from "../../Context/AuthContext";
import { Modal } from "antd";

const CreateCategory = () => {
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  const [category, setCategory] = useState([]);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-Category");
      if (data.success) {
        let categorys = !data.category
          ? []
          : Array.isArray(data.category)
          ? data.category
          : [data.category];
        setCategory(categorys);
        setCount(!categorys ? 0 : categorys.length);
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
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        categoryName: name,
        userId: auth?.user?.id,
      });
      if (data?.success) {
        toast.success(`${data.newCategory.CategoryName} is created.`);
        getAllCategory();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error in Create Category");
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${categoryId}`,
        {
          name: selected,
          userId: auth?.user?.id,
        }
      );
      if (data?.success) {
        toast.success(`${data.category.CategoryName} is Updated.`);
        getAllCategory();
        setVisible(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error in Update Category");
    }
  };

  const updateButton = (e) => {
    e.preventDefault();
    setVisible(true);
    const categoryId = e.target.getAttribute("data-id");
    const categoryName = e.target.getAttribute("data-text");

    setCategoryId(categoryId);
    setSelected(categoryName);
  };

  const deleteButton = (e) => {
    e.preventDefault();
    setDeleteVisible(true);
    setCategoryId(e.target.getAttribute("data-id"));
    setSelected(e.target.getAttribute("data-text"));
  };

  const conformDelete = async (e) => {
    e.preventDefault();
    try {
      const isDelete =
        e.target.getAttribute("data-value") === "yes" ? true : false;
      if (isDelete) {
        const { data } = await axios.delete(
          `/api/v1/category/delete-CategoryById/${categoryId}`,
          {
            userId: auth?.user?.id,
          }
        );
        if (data?.success) {
          toast.success(`${selected} category is deleted.`);
          getAllCategory();
          setDeleteVisible(false);
        } else {
          toast.error(data.message);
        }
      } else {
        setDeleteVisible(false);
      }
    } catch (error) {
      console.log("error in yesDelete Category");
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
                        <button
                          className="btn btn-primary ms-2"
                          onClick={updateButton}
                          data-id={x.Id}
                          data-text={x.CategoryName}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={deleteButton}
                          data-id={x.Id}
                          data-text={x.CategoryName}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              category={selected}
              setCategory={setSelected}
              submitHandler={updateHandler}
              isUpdate={visible}
            />
          </Modal>
          <Modal
            onCancel={() => setDeleteVisible(false)}
            footer={null}
            visible={deleteVisible}
          >
            <div className="d-flex flex-column justify-content-center">
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
              </div>
              <div className="row">
                <div className="col-md-12 text-end">
                  <button
                    className="btn btn-danger m-1"
                    onClick={conformDelete}
                    data-value="yes"
                    style={{ width: "5rem" }}
                  >
                    Yes
                  </button>
                  <button
                    className="btn btn-primary m-1"
                    onClick={conformDelete}
                    data-value="no"
                    style={{ width: "5rem" }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
