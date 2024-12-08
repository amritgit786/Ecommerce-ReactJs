import Header from "./Header";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <Header />
      {/* <!--**********************************
            Sidebar start
        ***********************************--> */}
      <div className="nk-sidebar">
        <div className="nk-nav-scroll">
          <ul className="metismenu" id="menu">
            <li>
              <Link to="/admin">
                <i className="icon-speedometer menu-icon"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li className="mega-menu mega-menu-sm">
              <Link className="has-arrow" to="/admin/category">
                <i className="icon-globe-alt menu-icon"></i>
                <span className="nav-text">Category</span>
              </Link>
              <ul>
                <li>
                  <Link to="/admin/category">Add New Category</Link>
                </li>
                <li>
                  <Link to="/admin/listcategory">All Categories</Link>
                </li>
              </ul>
            </li>
            <li className="mega-menu mega-menu-sm">
              <Link className="has-arrow" to="/admin/subcategory">
                <i className="icon-globe-alt menu-icon"></i>
                <span className="nav-text">SubCategory</span>
              </Link>
              <ul>
                <li>
                  <Link to="/admin/subcategory">Add New SubCategory</Link>
                </li>
                <li>
                  <Link to="/admin/listsubcategory">All SubCategories</Link>
                </li>
              </ul>
            </li>
            <li className="mega-menu mega-menu-sm">
              <Link className="has-arrow" to="/admin/state">
                <i className="icon-globe-alt menu-icon"></i>
                <span className="nav-text">State</span>
              </Link>
              <ul>
                <li>
                  <Link to="/admin/state">Add New State</Link>
                </li>
                <li>
                  <Link to="/admin/liststate">All State</Link>
                </li>
              </ul>
            </li>
            <li className="mega-menu mega-menu-sm">
              <Link className="has-arrow" to="/admin/city">
                <i className="icon-globe-alt menu-icon"></i>
                <span className="nav-text">City</span>
              </Link>
              <ul>
                <li>
                  <Link to="/admin/city">Add New City</Link>
                </li>
                <li>
                  <Link to="/admin/listcity">All City</Link>
                </li>
              </ul>
            </li>
            <li className="mega-menu mega-menu-sm">
              <Link className="has-arrow" to="/admin/area">
                <i className="icon-globe-alt menu-icon"></i>
                <span className="nav-text">Area</span>
              </Link>
              <ul>
                <li>
                  <Link to="/admin/area">Add New Area</Link>
                </li>
                <li>
                  <Link to="/admin/listarea">All Area</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link>
                <i className="icon-speedometer menu-icon"></i>
                <span className="nav-text">Customers</span>
              </Link>
            </li>
            <li>
              <Link>
                <i className="icon-speedometer menu-icon"></i>
                <span className="nav-text">Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/contact">
                <i className="icon-speedometer menu-icon"></i>
                <span className="nav-text">Inquiries</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/feedback">
                <i className="icon-speedometer menu-icon"></i>
                <span className="nav-text">FeedBack</span>
              </Link>
            </li>
            <li className="mega-menu mega-menu-sm">
              <Link className="has-arrow" to="/admin/category">
                <i className="icon-globe-alt menu-icon"></i>
                <span className="nav-text">Reports</span>
              </Link>
              <ul>
                <li>
                  <a href="./layout-blank.html">Customer Report</a>
                </li>
                <li>
                  <a href="./layout-one-column.html">Order Report</a>
                </li>
              </ul>
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
