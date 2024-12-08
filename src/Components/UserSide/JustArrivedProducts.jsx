import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Correctly import useNavigate
import { bagActions } from "../../store/bagSlice";
import { useDispatch, useSelector } from "react-redux";

const JustArrivedProducts = () => {
  const bagItems = useSelector((store) => store.bag.items); // Get the items array from the bag state
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use the navigate function properly

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

  const handleClick = (pid) => {
    navigate(`/shopdetail?pid=${pid}`);
  };

  return (
    <>
      <div className="container-fluid pt-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5">
            <span className="px-2">Just Arrived</span>
          </h2>
        </div>
        <div className="row px-xl-5 pb-3">
          {productList.map((item, i) => {
            const elementFound = bagItems.some(
              (bagItem) => bagItem.pid === item.pid
            );
            // console.log(item.pid, elementFound);

            return (
              <div key={i} className="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div className="card product-item border-0 mb-4">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src={`${baseURL}${item.image}`}
                      alt={item.product_name}
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">{item.product_name}</h6>
                    <div className="d-flex justify-content-center">
                      <h6>${item.price}</h6>
                      {/* <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6> */}
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <Link
                      to="#"
                      className="btn btn-sm text-dark p-0"
                      onClick={() => handleClick(item.pid)}
                    >
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </Link>
                    <Link
                      to={`/shopdetail?pid=${item.pid}`}
                      className="btn btn-sm text-dark p-0"
                      onClick={() => handleAddToBag(item.pid)}
                    >
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      {elementFound ? "In Cart" : "Add To Cart"}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default JustArrivedProducts;
