/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ isLoggedIn, handleLogout }) {
  const cartItemsLength = useSelector((state) => state.cart.cartItems.length);
  const isLoggedin = localStorage.getItem("isLoggedIn");

  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole"); // Retrieve user role from localStorage

  const handleLogoutAndRedirect = () => {
    handleLogout(); // Perform the logout
    localStorage.removeItem("userRole"); // Clear user role from localStorage
    navigate("/LoginAdmin"); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/logo-udemy.png" alt="Logo" />
        </Link>
        <form className="d-flex w-50" role="search">
          <input
            className="form-control me-2 p-3 border rounded-5"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav w-100 d-flex justify-content-around">
            <li className="nav-item">
              <Link
                className="nav-link text-capitalize fw-medium text-muted active"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-capitalize fw-medium text-muted"
                aria-current="page"
                to="/courses"
              >
                Courses
              </Link>
            </li>
            {isLoggedIn ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-dark"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userRole === "admin" ? "Admin" : "User"}
                </Link>
                <ul className="dropdown-menu">
                  {userRole === "admin" ? (
                    <Fragment>
                      <li>
                        <Link className="dropdown-item" to="/Admin/Products">
                          Dashboard Courses
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogoutAndRedirect}
                        >
                          Logout
                        </button>
                      </li>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <li>
                        <Link className="dropdown-item" to="/learning/joined">
                          My Learning
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogoutAndRedirect}
                        >
                          Logout
                        </button>
                      </li>
                    </Fragment>
                  )}
                </ul>
              </li>
            ) : (
              <Fragment>

                <li className="nav-item">
                  <Link
                    className="nav-link text-capitalize fw-medium text-muted"
                    to="/RegisterUser"
                  >
                    Sign Up
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link text-capitalize fw-medium text-muted"
                    to="/LoginAdmin"
                  >
                    Sign In
                  </Link>
                </li>
              </Fragment>

            )}
            <li className="nav-item">

              {isLoggedin == "true" && <Link
                className="nav-link text-capitalize fw-medium text-muted"
                to="/learning/wishlist"
              >
                <FaRegHeart className="fs-3" />
              </Link>}

            </li>
            <li className="nav-item position-relative">
              <Link
                className="nav-link text-capitalize fw-medium text-muted"
                to="/cart"
              >
                <span
                  style={{ width: "20px", height: "20px" }}
                  className="position-absolute bg-udemy rounded-circle end-0 top-0 text-white d-flex justify-content-center align-items-center p-2"
                >
                  {cartItemsLength}
                </span>
                <IoCartOutline className="fs-3" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
