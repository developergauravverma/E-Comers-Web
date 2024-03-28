import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className=" text-center mt-3">
        <h3>Admin Panel</h3>
        <div className="list-group">
          <NavLink
            to="/dashbord/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashbord/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashbord/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
