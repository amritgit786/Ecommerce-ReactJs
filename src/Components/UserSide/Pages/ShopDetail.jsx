// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link, useSearchParams } from "react-router-dom";
// import { bagActions } from "../../../store/bagSlice";
// import { useDispatch } from "react-redux";

// const ShopDetail = () => {
//   const [searchParams] = useSearchParams();
//   const pid = searchParams.get("pid");

//   const [productData, setProductData] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     async function getSingleProduct() {
//       const res = await axios.get(
//         `http://localhost/dbcategory/product/get_single_product_data.php?pid=${pid}`
//       );
//       setProductData(res.data);
//       console.log(res.data);
//     }
//     getSingleProduct();
//   }, [pid]);

//   const handleAddToBag = (pid) => {
//     dispatch(bagActions.addToBag(pid));
//   };

//   const baseURL = "http://localhost/dbcategory/product/images/";
//   return (
//     <>
//       {/* Page Header Start */}
//       <div className="container-fluid bg-secondary mb-5">
//         <div
//           className="d-flex flex-column align-items-center justify-content-center"
//           style={{ minHeight: "300px" }}
//         >
//           <h1 className="font-weight-semi-bold text-uppercase mb-3">
//             Shop Detail
//           </h1>
//           <div className="d-inline-flex">
//             <p className="m-0">
//               <a href="/">Home</a>
//             </p>
//             <p className="m-0 px-2">-</p>
//             <p className="m-0">Shop Detail</p>
//           </div>
//         </div>
//       </div>
//       {/* Page Header End */}

//       {/* Shop Detail Start */}
//       {productData && (
//         <div className="container-fluid py-5">
//           <div className="row px-xl-5">
//             <div className="col-lg-5 pb-5">
//               <div
//                 id="product-carousel"
//                 className="carousel slide"
//                 data-ride="carousel"
//               >
//                 <div className="carousel-inner border">
//                   {[...Array(4)].map((_, index) => (
//                     <div
//                       key={index}
//                       className={`carousel-item ${index === 0 ? "active" : ""}`}
//                     >
//                       <img
//                         className="w-100 h-100"
//                         src={`${baseURL}${productData.image}`}
//                         alt="Product"
//                       />
//                     </div>
//                   ))}
//                 </div>
//                 <a
//                   className="carousel-control-prev"
//                   href="#product-carousel"
//                   data-slide="prev"
//                 >
//                   <i className="fa fa-2x fa-angle-left text-dark"></i>
//                 </a>
//                 <a
//                   className="carousel-control-next"
//                   href="#product-carousel"
//                   data-slide="next"
//                 >
//                   <i className="fa fa-2x fa-angle-right text-dark"></i>
//                 </a>
//               </div>
//             </div>

//             <div className="col-lg-7 pb-5">
//               <h3 className="font-weight-semi-bold">
//                 {productData.product_name}
//               </h3>
//               <div className="d-flex mb-3">
//                 <div className="text-primary mr-2">
//                   <small className="fas fa-star"></small>
//                   <small className="fas fa-star"></small>
//                   <small className="fas fa-star"></small>
//                   <small className="fas fa-star-half-alt"></small>
//                   <small className="far fa-star"></small>
//                 </div>
//                 <small className="pt-1">(50 Reviews)</small>
//               </div>
//               <h3 className="font-weight-semi-bold mb-4">
//                 ${productData.price}
//               </h3>
//               <p className="mb-4">{productData.description}</p>
//               <div className="d-flex mb-3">
//                 <p className="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
//                 <form>
//                   {["XS", "S", "M", "L", "XL"].map((size, index) => (
//                     <div
//                       key={index}
//                       className="custom-control custom-radio custom-control-inline"
//                     >
//                       <input
//                         type="radio"
//                         className="custom-control-input"
//                         id={`size-${index + 1}`}
//                         name="size"
//                       />
//                       <label
//                         className="custom-control-label"
//                         htmlFor={`size-${index + 1}`}
//                       >
//                         {size}
//                       </label>
//                     </div>
//                   ))}
//                 </form>
//               </div>
//               <div className="d-flex mb-4">
//                 <p className="text-dark font-weight-medium mb-0 mr-3">
//                   Colors:
//                 </p>
//                 <form>
//                   {["Black", "White", "Red", "Blue", "Green"].map(
//                     (color, index) => (
//                       <div
//                         key={index}
//                         className="custom-control custom-radio custom-control-inline"
//                       >
//                         <input
//                           type="radio"
//                           className="custom-control-input"
//                           id={`color-${index + 1}`}
//                           name="color"
//                         />
//                         <label
//                           className="custom-control-label"
//                           htmlFor={`color-${index + 1}`}
//                         >
//                           {color}
//                         </label>
//                       </div>
//                     )
//                   )}
//                 </form>
//               </div>
//               <div className="d-flex align-items-center mb-4 pt-2">
//                 <div
//                   className="input-group quantity mr-3"
//                   style={{ width: "130px" }}
//                 >
//                   <div className="input-group-btn">
//                     <button className="btn btn-primary btn-minus">
//                       <i className="fa fa-minus"></i>
//                     </button>
//                   </div>
//                   <input
//                     type="text"
//                     className="form-control bg-secondary text-center"
//                     value="1"
//                   />
//                   <div className="input-group-btn">
//                     <button className="btn btn-primary btn-plus">
//                       <i className="fa fa-plus"></i>
//                     </button>
//                   </div>
//                 </div>
//                 <Link
//                   to="#"
//                   className="btn btn-sm text-dark p-0"
//                   onClick={() => handleAddToBag(productData.pid)}
//                 >
//                   <button className="btn btn-primary px-3">
//                     <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
//                   </button>
//                 </Link>
//                 {/* <button className="btn btn-primary px-3">
//                   <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
//                 </button> */}
//               </div>
//               <div className="d-flex pt-2">
//                 <p className="text-dark font-weight-medium mb-0 mr-2">
//                   Share on:
//                 </p>
//                 <div className="d-inline-flex">
//                   <a className="text-dark px-2" href="">
//                     <i className="fab fa-facebook-f"></i>
//                   </a>
//                   <a className="text-dark px-2" href="">
//                     <i className="fab fa-twitter"></i>
//                   </a>
//                   <a className="text-dark px-2" href="">
//                     <i className="fab fa-linkedin-in"></i>
//                   </a>
//                   <a className="text-dark px-2" href="">
//                     <i className="fab fa-pinterest"></i>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Shop Detail End */}

//       {/* Products Start */}
//       <div className="container-fluid py-5">
//         <div className="text-center mb-4">
//           <h2 className="section-title px-5">
//             <span className="px-2">You May Also Like</span>
//           </h2>
//         </div>
//         <div className="row px-xl-5">
//           <div className="col">
//             <div className="owl-carousel related-carousel">
//               {[1, 2, 3, 4, 5].map((product) => (
//                 <div key={product} className="card product-item border-0">
//                   <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
//                     <img
//                       className="img-fluid w-100"
//                       src={`src/assets/user/img/product-${product}.jpg`}
//                       alt=""
//                     />
//                   </div>
//                   <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
//                     <h6 className="text-truncate mb-3">
//                       Colorful Stylish Shirt
//                     </h6>
//                     <div className="d-flex justify-content-center">
//                       <h6>$123.00</h6>
//                       <h6 className="text-muted ml-2">
//                         <del>$123.00</del>
//                       </h6>
//                     </div>
//                   </div>
//                   <div className="card-footer d-flex justify-content-between bg-light border">
//                     <a href="" className="btn btn-sm text-dark p-0">
//                       <i className="fas fa-eye text-primary mr-1"></i>View
//                       Detail
//                     </a>
//                     <a href="" className="btn btn-sm text-dark p-0">
//                       <i className="fas fa-shopping-cart text-primary mr-1"></i>
//                       Add To Cart
//                     </a>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Products End */}
//     </>
//   );
// };

// export default ShopDetail;

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bagActions } from "../../../store/bagSlice";

const ShopDetail = () => {
  const [searchParams] = useSearchParams();
  const pid = searchParams.get("pid");
  const [productData, setProductData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getSingleProduct() {
      const res = await axios.get(
        `http://localhost/dbcategory/product/get_single_product_data.php?pid=${pid}`
      );
      setProductData(res.data);
      console.log(res.data);
    }
    getSingleProduct();
  }, [pid]);

  const baseURL = "http://localhost/dbcategory/product/images/";

  const handleAddToCart = () => {
    dispatch(bagActions.addToBag(pid));
  };
  const handleIncrementQty = (pid) => {
    dispatch(bagActions.incrementQty(pid));
  };

  const handleDecrementQty = (pid) => {
    dispatch(bagActions.decrementQty(pid));
  };

  return (
    <>
      {/* Page Header Start */}
      <div className="container-fluid bg-secondary mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "300px" }}
        >
          <h1 className="font-weight-semi-bold text-uppercase mb-3">
            Shop Detail
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <a href="/">Home</a>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Shop Detail</p>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Shop Detail Start */}
      {productData && (
        <div className="container-fluid py-5">
          <div className="row px-xl-5">
            <div className="col-lg-5 pb-5">
              <div
                id="product-carousel"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner border">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img
                        className="w-100 h-100"
                        src={`${baseURL}${productData.image}`}
                        alt="Product"
                      />
                    </div>
                  ))}
                </div>
                <a
                  className="carousel-control-prev"
                  href="#product-carousel"
                  data-slide="prev"
                >
                  <i className="fa fa-2x fa-angle-left text-dark"></i>
                </a>
                <a
                  className="carousel-control-next"
                  href="#product-carousel"
                  data-slide="next"
                >
                  <i className="fa fa-2x fa-angle-right text-dark"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-7 pb-5">
              <h3 className="font-weight-semi-bold">
                {productData.product_name}
              </h3>
              <div className="d-flex mb-3">
                <div className="text-primary mr-2">
                  <small className="fas fa-star"></small>
                  <small className="fas fa-star"></small>
                  <small className="fas fa-star"></small>
                  <small className="fas fa-star-half-alt"></small>
                  <small className="far fa-star"></small>
                </div>
                <small className="pt-1">(50 Reviews)</small>
              </div>
              <h3 className="font-weight-semi-bold mb-4">
                ${productData.price}
              </h3>
              <p className="mb-4">{productData.description}</p>
              <div className="d-flex mb-3">
                <p className="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
                <form>
                  {["XS", "S", "M", "L", "XL"].map((size, index) => (
                    <div
                      key={index}
                      className="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        className="custom-control-input"
                        id={`size-${index + 1}`}
                        name="size"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor={`size-${index + 1}`}
                      >
                        {size}
                      </label>
                    </div>
                  ))}
                </form>
              </div>
              {/* <div className="d-flex mb-4">
                <p className="text-dark font-weight-medium mb-0 mr-3">
                  Colors:
                </p>
                <form>
                  {["Black", "White", "Red", "Blue", "Green"].map(
                    (color, index) => (
                      <div
                        key={index}
                        className="custom-control custom-radio custom-control-inline"
                      >
                        <input
                          type="radio"
                          className="custom-control-input"
                          id={`color-${index + 1}`}
                          name="color"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`color-${index + 1}`}
                        >
                          {color}
                        </label>
                      </div>
                    )
                  )}
                </form>
              </div> */}
              <div className="d-flex align-items-center mb-2 pt-2">
                {/* <div
                  className="input-group quantity"
                  style={{ width: "130px" }}
                >
                  <div className="input-group-btn">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleDecrementQty(productData.pid)}
                    >
                      -
                    </button>
                  </div>
                  <span className="px-2">0</span>
                  <div className="input-group-btn">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleIncrementQty(productData.pid)}
                    >
                      +
                    </button>
                  </div>
                </div> */}
                <button
                  className="btn btn-primary px-3"
                  onClick={handleAddToCart}
                >
                  <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
                </button>
              </div>
              <div className="d-flex pt-2">
                <p className="text-dark font-weight-medium mb-0 mr-2">
                  Share on:
                </p>
                <div className="d-inline-flex">
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="text-dark px-2" href="">
                    <i className="fab fa-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Shop Detail End */}

      {/* Products Start */}
      {/* <div className="container-fluid py-5">
        <div className="text-center mb-4">
          <h2 className="section-title px-5">
            <span className="px-2">You May Also Like</span>
          </h2>
        </div>
        <div className="row px-xl-5">
          <div className="col">
            <div className="owl-carousel related-carousel">
              {[1, 2, 3, 4, 5].map((product) => (
                <div key={product} className="card product-item border-0">
                  <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                    <img
                      className="img-fluid w-100"
                      src={`src/assets/user/img/product-${product}.jpg`}
                      alt=""
                    />
                  </div>
                  <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                    <h6 className="text-truncate mb-3">
                      Colorful Stylish Shirt
                    </h6>
                    <div className="d-flex justify-content-center">
                      <h6>$123.00</h6>
                      <h6 className="text-muted ml-2">
                        <del>$123.00</del>
                      </h6>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-between bg-light border">
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-eye text-primary mr-1"></i>View
                      Detail
                    </a>
                    <a href="" className="btn btn-sm text-dark p-0">
                      <i className="fas fa-shopping-cart text-primary mr-1"></i>
                      Add To Cart
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
      {/* Products End */}
    </>
  );
};

export default ShopDetail;
