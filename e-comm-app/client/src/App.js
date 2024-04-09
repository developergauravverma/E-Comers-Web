import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import { PrivateRoute } from "./Components/Routes/PrivateRoute";
import Dashbord from "./Pages/User/Dashbord";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import { AdminPrivateRoute } from "./Components/Routes/AdminPrivateRoute";
import AdminDashbord from "./Pages/Admin/AdminDashbord";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Users from "./Pages/Admin/Users";
import Profile from "./Pages/User/Profile";
import Orders from "./Pages/User/Orders";
import ProductsPage from "./Pages/Admin/ProductsPage";
import ProductDetails from "./Pages/User/ProductDetails";
import AllCategories from "./Pages/AllCategories";
import CategoryProduct from "./Pages/CategoryProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productdetails/:productId" element={<ProductDetails />} />
        <Route path="/category/" element={<AllCategories />} />
        <Route path="/category/:cid" element={<CategoryProduct />} />
        <Route path="/dashbord" element={<PrivateRoute />}>
          <Route path="user" element={<Dashbord />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashbord" element={<AdminPrivateRoute />}>
          <Route path="admin" element={<AdminDashbord />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/products" element={<ProductsPage />} />
        </Route>
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/category" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
