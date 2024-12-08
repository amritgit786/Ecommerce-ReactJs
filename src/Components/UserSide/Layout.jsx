// components/Layout.js
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      {/* <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
        <Link to="/" className="text-decoration-none d-block d-lg-none">
          <h1 className="m-0 display-5 font-weight-semi-bold">
            <span className="text-primary font-weight-bold border px-3 mr-1">
              E
            </span>
            Shopper
          </h1>
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarCollapse"
        >
          <div className="navbar-nav mr-auto py-0">
            <Link to="/" className="nav-item nav-link" aria-current="page">
              Home
            </Link>
            <Link to="/shop" className="nav-item nav-link">
              Shop
            </Link>
            <Link to="/shopdetail" className="nav-item nav-link">
              Shop Detail
            </Link>
            <div className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                Pages
              </Link>
              <div className="dropdown-menu rounded-0 m-0">
                <Link to="/cart" className="dropdown-item">
                  Shopping Cart
                </Link>
                <Link to="/checkout" className="dropdown-item">
                  Checkout
                </Link>
              </div>
            </div>
            <Link to="/contact" className="nav-item nav-link">
              Contact
            </Link>
          </div>
          <div className="navbar-nav ml-auto py-0">
            {isLoggedIn ? (
              <button className="btn btn-outline-danger" onClick={logout}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="nav-item nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-item nav-link">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav> */}
      <Outlet />
      <a href="#" className="btn btn-primary back-to-top">
        <i className="fa fa-angle-double-up"></i>
      </a>
    </>
  );
};

export default Layout;
