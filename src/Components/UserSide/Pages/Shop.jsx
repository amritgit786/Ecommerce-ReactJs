import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { bagActions } from "../../../store/bagSlice";
import { useDispatch, useSelector } from "react-redux";

const Shop = () => {
  // const bagItems = useSelector((store) => store.bag.items);

  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    async function getAllProductsData() {
      try {
        const res = await axios.get(
          "http://localhost/dbcategory/product/get_all_product_data.php"
        );
        setProductList(res.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
    getAllProductsData();
  }, []);

  const baseURL = "http://localhost/dbcategory/product/images/";

  const handleAddToBag = (pid) => {
    dispatch(bagActions.addToBag(pid));
  };

  return (
    <>
      {/* Page Header Start */}
      <div className="container-fluid bg-secondary mb-3">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "300px" }}
        >
          <h1 className="font-weight-semi-bold text-uppercase mb-3">
            Our Shop
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <a href="/">Home</a>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Shop</p>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Shop Start */}
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          {/* Shop Sidebar Start */}
          {/* <div className="col-lg-3 col-md-12">
            Sidebar filters
            </div> */}
          {/* Shop Sidebar End */}

          {/* Shop Product Start */}
          <div className="col-lg-12 col-md-12">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <form action="">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                      />
                      <div className="input-group-append">
                        <span className="input-group-text bg-transparent text-primary">
                          <i className="fa fa-search"></i>
                        </span>
                      </div>
                    </div>
                  </form>
                  <div className="dropdown ml-4">
                    <button
                      className="btn border dropdown-toggle"
                      type="button"
                      id="triggerId"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sort by
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="triggerId"
                    >
                      <a className="dropdown-item" href="#">
                        Latest
                      </a>
                      <a className="dropdown-item" href="#">
                        Popularity
                      </a>
                      <a className="dropdown-item" href="#">
                        Best Rating
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {productList.map((item) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-12 pb-1"
                  key={item.pid}
                >
                  <div className="card product-item border-0 mb-4">
                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                      <img
                        className="img-fluid w-100"
                        src={`${baseURL}${item.image}`}
                        alt={item.product_name}
                      />
                    </div>
                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                      <h6 className="text-truncate mb-3">
                        {item.product_name}
                      </h6>
                      <div className="d-flex justify-content-center">
                        <h6>{item.price}</h6>
                      </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between bg-light border">
                      <Link
                        to={`/shopdetail?pid=${item.pid}`}
                        className="btn btn-sm text-dark p-0"
                      >
                        <i className="fas fa-eye text-primary mr-1"></i>View
                        Detail
                      </Link>
                      <button
                        className="btn btn-sm text-dark p-0"
                        onClick={() => handleAddToBag(item.pid)}
                      >
                        <i className="fas fa-shopping-cart text-primary mr-1"></i>
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col-12 pb-1">
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center mb-3">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          {/* Shop Product End */}
        </div>
      </div>
      {/* Shop End */}
    </>
  );
};

export default Shop;
