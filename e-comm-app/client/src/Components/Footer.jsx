import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer sticky-bottom" style={{ height: "125px" }}>
        <h1 className="text-center">All right reserve &copy; gaurav verma</h1>
        <p className="text-center mt-3">
          <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
          <Link to="/policy">Policy</Link>
        </p>
      </div>
    </>
  );
};

export default Footer;
