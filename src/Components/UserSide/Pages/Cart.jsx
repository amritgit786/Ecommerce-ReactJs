import { useSelector, useDispatch } from "react-redux";
import { bagActions } from "../../../store/bagSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Cart = () => {
  const bagItems = useSelector((state) => state.bag.items);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const finalItems = items
    .filter((item) => bagItems.some((bagItem) => bagItem.pid === item.pid))
    .map((item) => {
      const bagItem = bagItems.find((b) => b.pid === item.pid);
      return { ...item, qty: bagItem.qty };
    });

  const CONVENIENCEFEES = 99;
  let totalMRP = 0;

  finalItems.forEach((bagItem) => {
    totalMRP += bagItem.price * bagItem.qty;
  });

  let finalPayment = totalMRP + CONVENIENCEFEES;

  const baseURL = "http://localhost/dbcategory/product/images/";

  const handleRemoveFromBag = (pid) => {
    dispatch(bagActions.removeFromBag(pid));
  };

  const handleIncrementQty = (pid) => {
    dispatch(bagActions.incrementQty(pid));
  };

  const handleDecrementQty = (pid) => {
    dispatch(bagActions.decrementQty(pid));
  };

  const handleCheckOut = (pid, qty, price) => {
    navigate(
      "/checkout",
      ((pid = { pid }), (qty = { qty }), (price = { price }))
    );
  };
  useEffect(() => {
    localStorage.setItem("total_amount", finalPayment);
  }, [finalPayment]);

  return (
    <>
      <div>
        {/* Page Header */}
        <div className="container-fluid bg-secondary mb-3">
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: 300 }}
          >
            <h1 className="font-weight-semi-bold text-uppercase mb-3">
              Shopping Cart
            </h1>
            <div className="d-inline-flex">
              <p className="m-0">
                <a href="/">Home</a>
              </p>
              <p className="m-0 px-2">-</p>
              <p className="m-0">Shopping Cart</p>
            </div>
          </div>
        </div>
      </div>
      {/* Cart Start */}
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-bordered text-center mb-0">
              <thead className="bg-secondary text-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {finalItems.map((item) => (
                  <tr key={item.pid}>
                    <td className="align-middle">
                      <img
                        src={`${baseURL}${item.image}`}
                        alt={item.product_name}
                        style={{ width: 50 }}
                      />{" "}
                      {item.product_name}
                    </td>
                    <td className="align-middle">{item.price}</td>
                    <td className="align-middle">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleDecrementQty(item.pid)}
                      >
                        -
                      </button>
                      <span className="px-2">{item.qty}</span>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleIncrementQty(item.pid)}
                      >
                        +
                      </button>
                    </td>
                    <td className="align-middle">{item.price * item.qty}</td>
                    <td className="align-middle">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleRemoveFromBag(item.pid)}
                      >
                        <i className="fa fa-times"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-lg-4">
            <form className="mb-30" action="">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control border-0 p-4"
                  placeholder="Coupon Code"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary">Apply Coupon</button>
                </div>
              </div>
            </form>
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Cart Summary</span>
            </h5>
            <div className="bg-light p-30 mb-5">
              <div className="border-bottom pb-2">
                <div className="d-flex justify-content-between mb-3">
                  <h6>Total MRP</h6>
                  <h6>{totalMRP}</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Convenience Fee</h6>
                  <h6 className="font-weight-medium">{CONVENIENCEFEES}</h6>
                </div>
              </div>
              <div className="pt-2">
                <div className="d-flex justify-content-between mt-2">
                  <h5>Total Payment</h5>
                  <h5>{finalPayment}</h5>
                </div>
                <button
                  className="btn btn-block btn-primary font-weight-bold my-3 py-3"
                  onClick={handleCheckOut}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Cart End */}
    </>
  );
};

export default Cart;
