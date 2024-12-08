import { Link } from "react-router-dom";
import Header from "./Header";

const Sidebar = () => {
  return (
    <>
      {/* <!--**********************************
            Sidebar start
        ***********************************--> */}
      <Header />
      <div className="nk-sidebar">
        <div className="nk-nav-scroll">
          <ul className="metismenu" id="menu">
            <li>
              <Link to="/seller">
                <i className="icon-speedometer menu-icon"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
              {/*               
              <ul>
                <li>
                  <Link to="/">Dashboard</Link>
                </li>
              </ul> */}
            </li>
            <li className="mega-menu mega-menu-sm">
              <Link className="has-arrow" to="/seller/product">
                <i className="icon-globe-alt menu-icon"></i>
                <span className="nav-text">Products</span>
              </Link>
              <ul>
                <li>
                  <Link to="/seller/product">Add New Product</Link>
                </li>
                <li>
                  <Link to="/seller/productlist">All Products</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link>
                <i className="icon-speedometer menu-icon"></i>
                <span className="nav-text">Orders</span>
              </Link>
            </li>
            <li>
              <Link>
                <i className="icon-speedometer menu-icon"></i>
                <span className="nav-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* <!--**********************************
            Sidebar end
        ***********************************--> */}
    </>
  );
};

export default Sidebar;
