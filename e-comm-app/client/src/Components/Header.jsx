import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import useCategory from "../hooks/useCategory";
import { useCard } from "../Context/CardContext";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categorys = useCategory();
  const [card] = useCard();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    toast.success("Logout successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              E-Comm-App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    id="navbarScrollingDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Category
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarScrollingDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/category">
                        All Categorys
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    {categorys?.map((value, index) => (
                      <li key={index}>
                        <NavLink
                          className="dropdown-item"
                          to={`/category/${value.Id}`}
                        >
                          {value.CategoryName}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      REGISTER
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      LOGIN
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      id="navbarScrollingDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarScrollingDropdown"
                    >
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={`/dashbord/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashbord
                        </NavLink>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          className="dropdown-item"
                          to="/login"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item position-relative">
                <NavLink className="nav-link" to="/cart">
                  cart
                  <span className="position-absolute start-100 translate-middle badge rounded-pill bg-danger">
                    {card?.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
