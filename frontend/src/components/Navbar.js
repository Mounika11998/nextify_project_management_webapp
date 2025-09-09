import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / Brand */}
        <Link to="/" className="navbar-logo">
          Product<span>Hub</span>
        </Link>

        {/* Links */}
        <div className="navbar-links">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Categories
          </NavLink>
        </div>

        {/* Call-to-action button */}
        <Link to="/products/new" className="navbar-btn">
          + Add Product
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
