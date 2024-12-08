// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const Checkout = () => {
//   const location = useLocation();
//   const initialAmount = location.state?.totalAmount || 0;
//   const [userId, setUserId] = useState("");
//   const [totalAmount, setTotalAmount] = useState(initialAmount);
//   const [billingDetails, setBillingDetails] = useState({
//     billing_address_first_name: "",
//     billing_address_last_name: "",
//     billing_address_email: "",
//     billing_address_phone_number: "",
//     billing_address_address: "",
//     billing_address_postal_code: "",
//     check_box_value: false,
//   });
//   const [shippingDetails, setShippingDetails] = useState({
//     shipping_address_first_name: "",
//     shipping_address_last_name: "",
//     shipping_address_email: "",
//     shipping_address_phone_number: "",
//     shipping_address_address: "",
//     shipping_address_postal_code: "",
//   });
//   const [paymentMethod, setPaymentMethod] = useState("");

//   useEffect(() => {
//     const user_id1 = localStorage.getItem("reg_id");
//     const user_id = JSON.parse(user_id1);
//     const storedTotalAmount = localStorage.getItem("total_amount");

//     if (user_id) {
//       setUserId(user_id);
//     }

//     if (storedTotalAmount) {
//       setTotalAmount(Number(storedTotalAmount));
//     }

//     // Load Razorpay SDK asynchronously
//     const loadRazorpayScript = async () => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.async = true;
//       script.onload = () => {
//         console.log("Razorpay SDK loaded successfully");
//       };
//       document.body.appendChild(script);
//     };

//     loadRazorpayScript();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value, checked, type: inputType } = e.target;
//     const newValue = inputType === "checkbox" ? checked : value;

//     setBillingDetails((prev) => {
//       const updatedBillingDetails = { ...prev, [name]: newValue };

//       if (name === "check_box_value") {
//         if (newValue === false) {
//           setShippingDetails({
//             shipping_address_first_name:
//               updatedBillingDetails.billing_address_first_name,
//             shipping_address_last_name:
//               updatedBillingDetails.billing_address_last_name,
//             shipping_address_email: updatedBillingDetails.billing_address_email,
//             shipping_address_phone_number:
//               updatedBillingDetails.billing_address_phone_number,
//             shipping_address_address:
//               updatedBillingDetails.billing_address_address,
//             shipping_address_postal_code:
//               updatedBillingDetails.billing_address_postal_code,
//           });
//         }
//         return updatedBillingDetails;
//       }

//       if (updatedBillingDetails.check_box_value === false) {
//         setShippingDetails({
//           shipping_address_first_name:
//             updatedBillingDetails.billing_address_first_name,
//           shipping_address_last_name:
//             updatedBillingDetails.billing_address_last_name,
//           shipping_address_email: updatedBillingDetails.billing_address_email,
//           shipping_address_phone_number:
//             updatedBillingDetails.billing_address_phone_number,
//           shipping_address_address:
//             updatedBillingDetails.billing_address_address,
//           shipping_address_postal_code:
//             updatedBillingDetails.billing_address_postal_code,
//         });
//       }

//       return updatedBillingDetails;
//     });

//     if (inputType !== "checkbox") {
//       setShippingDetails((prev) => ({
//         ...prev,
//         [`shipping_${name.replace("billing_", "")}`]: newValue,
//       }));
//     }
//   };

//   const handlePayment = async (order_id) => {
//     const options = {
//       key: "rzp_test_B1gWkpahWOiHhy",
//       amount: (totalAmount + 10) * 100,
//       currency: "INR",
//       name: "Your Company Name",
//       order_id: order_id,
//       description: "Test Transaction",
//       handler: async function (response) {
//         const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
//           response;
//         console.log(`Order ID = > ${order_id}`);
//         console.log(razorpay_payment_id);
//         console.log(razorpay_order_id);
//         console.log(razorpay_signature);
//         try {
//           const verifyResponse = await axios.post(
//             "http://localhost/dbcategory/cart/verify_payment.php",
//             {
//               payment_id: razorpay_payment_id,
//               order_id: razorpay_order_id,
//               signature: razorpay_signature,
//               user_id: userId,
//               total_amount: totalAmount,
//             }
//           );

//           if (verifyResponse.data.success) {
//             alert("Payment successful and order placed!");
//           } else {
//             alert(
//               "Payment verification failed: " + verifyResponse.data.message
//             );
//           }
//         } catch (error) {
//           console.error(
//             "Error verifying payment:",
//             error.response || error.message
//           );
//           alert("Failed to verify payment. Please try again.");
//         }
//       },
//       prefill: {
//         name: billingDetails.billing_address_first_name,
//         email: billingDetails.billing_address_email,
//         contact: billingDetails.billing_address_phone_number,
//       },
//       notes: {
//         address: billingDetails.billing_address_address,
//       },
//       theme: {
//         color: "#F37254",
//       },
//       method: {
//         upi: true,
//         card: true,
//         netbanking: true,
//         wallet: true,
//       },
//     };

//     const rzp1 = new window.Razorpay(options);
//     rzp1.open();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const reg_id = userId;
//       const config = {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       };

//       const billingAndShippingDetails = {
//         reg_id,
//         ...billingDetails,
//         ...(billingDetails.check_box_value ? {} : { ...shippingDetails }),
//       };

//       await axios.post(
//         "http://localhost/dbcategory/cart/billing_address_data.php",
//         billingAndShippingDetails,
//         config
//       );

//       const orderResponse = await axios.post(
//         "http://localhost/dbcategory/cart/order_data_api.php",
//         {
//           reg_id,
//           total_amount: totalAmount,
//           payment_method: paymentMethod,
//         },
//         config
//       );
//       console.log(orderResponse);
//       if (orderResponse.data.success) {
//         const order_id = orderResponse.data.order_id;
//         console.log(order_id);
//         if (paymentMethod === "Online") {
//           handlePayment(order_id);
//         } else if (paymentMethod === "COD") {
//           alert("Order placed successfully!");
//         }
//       } else {
//         alert("Failed to place order: " + orderResponse.data.message);
//       }
//     } catch (error) {
//       console.error("Error placing order:", error.response || error.message);
//       alert("Failed to place order. Please try again.");
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid bg-secondary mb-3">
//         <div
//           className="d-flex flex-column align-items-center justify-content-center"
//           style={{ minHeight: 300 }}
//         >
//           <h1 className="font-weight-semi-bold text-uppercase mb-3">
//             Checkout
//           </h1>
//           <div className="d-inline-flex">
//             <p className="m-0">
//               <a href="/">Home</a>
//             </p>
//             <p className="m-0 px-2">-</p>
//             <p className="m-0">Checkout</p>
//           </div>
//         </div>
//       </div>
//       <div className="container-fluid pt-5">
//         <div className="row px-xl-5">
//           <div className="col-lg-8">
//             <div className="mb-4">
//               <h4 className="font-weight-semi-bold mb-4">Billing Address</h4>
//               <form onSubmit={handleSubmit}>
//                 <div className="row">
//                   <div className="col-md-6 form-group">
//                     <label>First Name</label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       name="billing_address_first_name"
//                       value={billingDetails.billing_address_first_name}
//                       onChange={(e) => handleInputChange(e)}
//                     />
//                   </div>
//                   <div className="col-md-6 form-group">
//                     <label>Last Name</label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       name="billing_address_last_name"
//                       value={billingDetails.billing_address_last_name}
//                       onChange={(e) => handleInputChange(e)}
//                     />
//                   </div>
//                   <div className="col-md-6 form-group">
//                     <label>Email</label>
//                     <input
//                       className="form-control"
//                       type="email"
//                       name="billing_address_email"
//                       value={billingDetails.billing_address_email}
//                       onChange={(e) => handleInputChange(e)}
//                     />
//                   </div>
//                   <div className="col-md-6 form-group">
//                     <label>Mobile No</label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       name="billing_address_phone_number"
//                       value={billingDetails.billing_address_phone_number}
//                       onChange={(e) => handleInputChange(e)}
//                     />
//                   </div>
//                   <div className="col-md-6 form-group">
//                     <label>Address</label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       name="billing_address_address"
//                       value={billingDetails.billing_address_address}
//                       onChange={(e) => handleInputChange(e)}
//                     />
//                   </div>
//                   <div className="col-md-6 form-group">
//                     <label>Postal Code</label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       name="billing_address_postal_code"
//                       value={billingDetails.billing_address_postal_code}
//                       onChange={(e) => handleInputChange(e)}
//                     />
//                   </div>
//                   <div className="col-md-12 form-group">
//                     <div className="custom-control custom-checkbox">
//                       <input
//                         type="checkbox"
//                         className="custom-control-input"
//                         id="shipto"
//                         name="check_box_value"
//                         checked={billingDetails.check_box_value}
//                         onChange={(e) => handleInputChange(e)}
//                       />
//                       <label className="custom-control-label" htmlFor="shipto">
//                         Ship to different address
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//                 {billingDetails.check_box_value && (
//                   <div className="mb-4">
//                     <h4 className="font-weight-semi-bold mb-4">
//                       Shipping Address
//                     </h4>
//                     <div className="row">
//                       <div className="col-md-6 form-group">
//                         <label>First Name</label>
//                         <input
//                           className="form-control"
//                           type="text"
//                           name="shipping_address_first_name"
//                           value={shippingDetails.shipping_address_first_name}
//                           onChange={(e) => handleInputChange(e)}
//                         />
//                       </div>
//                       <div className="col-md-6 form-group">
//                         <label>Last Name</label>
//                         <input
//                           className="form-control"
//                           type="text"
//                           name="shipping_address_last_name"
//                           value={shippingDetails.shipping_address_last_name}
//                           onChange={(e) => handleInputChange(e)}
//                         />
//                       </div>
//                       <div className="col-md-6 form-group">
//                         <label>Email</label>
//                         <input
//                           className="form-control"
//                           type="email"
//                           name="shipping_address_email"
//                           value={shippingDetails.shipping_address_email}
//                           onChange={(e) => handleInputChange(e)}
//                         />
//                       </div>
//                       <div className="col-md-6 form-group">
//                         <label>Mobile No</label>
//                         <input
//                           className="form-control"
//                           type="text"
//                           name="shipping_address_phone_number"
//                           value={shippingDetails.shipping_address_phone_number}
//                           onChange={(e) => handleInputChange(e)}
//                         />
//                       </div>
//                       <div className="col-md-6 form-group">
//                         <label>Address</label>
//                         <input
//                           className="form-control"
//                           type="text"
//                           name="shipping_address_address"
//                           value={shippingDetails.shipping_address_address}
//                           onChange={(e) => handleInputChange(e)}
//                         />
//                       </div>
//                       <div className="col-md-6 form-group">
//                         <label>Postal Code</label>
//                         <input
//                           className="form-control"
//                           type="text"
//                           name="shipping_address_postal_code"
//                           value={shippingDetails.shipping_address_postal_code}
//                           onChange={(e) => handleInputChange(e)}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div className="card border-secondary mb-5">
//                   <div className="card-header bg-secondary border-0">
//                     <h4 className="font-weight-semi-bold m-0">Payment</h4>
//                   </div>
//                   <div className="card-body">
//                     <div className="form-group">
//                       <div className="custom-control custom-radio">
//                         <input
//                           type="radio"
//                           className="custom-control-input"
//                           id="Online"
//                           name="payment_method"
//                           value="Online"
//                           checked={paymentMethod === "Online"}
//                           onChange={(e) => setPaymentMethod(e.target.value)}
//                         />
//                         <label
//                           className="custom-control-label"
//                           htmlFor="Online"
//                         >
//                           Online
//                         </label>
//                       </div>
//                     </div>
//                     <div className="form-group">
//                       <div className="custom-control custom-radio">
//                         <input
//                           type="radio"
//                           className="custom-control-input"
//                           id="COD"
//                           name="payment_method"
//                           value="COD"
//                           checked={paymentMethod === "COD"}
//                           onChange={(e) => setPaymentMethod(e.target.value)}
//                         />
//                         <label className="custom-control-label" htmlFor="COD">
//                           Cash On Delivery
//                         </label>
//                       </div>
//                     </div>
//                     <div className="card-footer border-secondary bg-transparent">
//                       <button
//                         className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3"
//                         type="submit"
//                       >
//                         Place Order
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//           <div className="col-lg-4">
//             <div className="card border-secondary mb-5">
//               <div className="card-header bg-secondary border-0">
//                 <h4 className="font-weight-semi-bold m-0">Order Total</h4>
//               </div>
//               <div className="card-body">
//                 <div className="d-flex justify-content-between mb-3 pt-1">
//                   <h6 className="font-weight-medium">Subtotal</h6>
//                   <h6 className="font-weight-medium">${totalAmount}</h6>
//                 </div>
//                 <div className="d-flex justify-content-between">
//                   <h6 className="font-weight-medium">Shipping</h6>
//                   <h6 className="font-weight-medium">$10</h6>
//                 </div>
//               </div>
//               <div className="card-footer border-secondary bg-transparent">
//                 <div className="d-flex justify-content-between mt-2">
//                   <h5 className="font-weight-bold">Total</h5>
//                   <h5 className="font-weight-bold">${totalAmount + 10}</h5>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Checkout;

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const location = useLocation();
  const initialAmount = location.state?.totalAmount || 0;
  const [userId, setUserId] = useState("");
  const [totalAmount, setTotalAmount] = useState(initialAmount);
  const [billingDetails, setBillingDetails] = useState({
    billing_address_first_name: "",
    billing_address_last_name: "",
    billing_address_email: "",
    billing_address_phone_number: "",
    billing_address_address: "",
    billing_address_postal_code: "",
    check_box_value: false,
  });
  const [shippingDetails, setShippingDetails] = useState({
    shipping_address_first_name: "",
    shipping_address_last_name: "",
    shipping_address_email: "",
    shipping_address_phone_number: "",
    shipping_address_address: "",
    shipping_address_postal_code: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const user_id1 = localStorage.getItem("reg_id");
    const user_id = JSON.parse(user_id1);
    const storedTotalAmount = localStorage.getItem("total_amount");

    if (user_id) {
      setUserId(user_id);
    }

    if (storedTotalAmount) {
      setTotalAmount(Number(storedTotalAmount));
    }

    // Load Razorpay SDK asynchronously
    const loadRazorpayScript = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        console.log("Razorpay SDK loaded successfully");
      };
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, checked, type: inputType } = e.target;
    const newValue = inputType === "checkbox" ? checked : value;

    setBillingDetails((prev) => {
      const updatedBillingDetails = { ...prev, [name]: newValue };

      if (name === "check_box_value") {
        if (newValue === false) {
          setShippingDetails({
            shipping_address_first_name:
              updatedBillingDetails.billing_address_first_name,
            shipping_address_last_name:
              updatedBillingDetails.billing_address_last_name,
            shipping_address_email: updatedBillingDetails.billing_address_email,
            shipping_address_phone_number:
              updatedBillingDetails.billing_address_phone_number,
            shipping_address_address:
              updatedBillingDetails.billing_address_address,
            shipping_address_postal_code:
              updatedBillingDetails.billing_address_postal_code,
          });
        }
        return updatedBillingDetails;
      }

      if (updatedBillingDetails.check_box_value === false) {
        setShippingDetails({
          shipping_address_first_name:
            updatedBillingDetails.billing_address_first_name,
          shipping_address_last_name:
            updatedBillingDetails.billing_address_last_name,
          shipping_address_email: updatedBillingDetails.billing_address_email,
          shipping_address_phone_number:
            updatedBillingDetails.billing_address_phone_number,
          shipping_address_address:
            updatedBillingDetails.billing_address_address,
          shipping_address_postal_code:
            updatedBillingDetails.billing_address_postal_code,
        });
      }

      return updatedBillingDetails;
    });

    if (inputType !== "checkbox") {
      setShippingDetails((prev) => ({
        ...prev,
        [`shipping_${name.replace("billing_", "")}`]: newValue,
      }));
    }
  };

  const saveOrderDetails = async (order_id) => {
    try {
      // Assuming you have the necessary details (pid, qty, amount) to send to the orders_details_data.php API
      const orderDetails = [
        {
          pid: "product_id_1", // Replace with actual product ID
          qty: 1, // Replace with actual quantity
          amount: 100, // Replace with actual amount
        },
        // Add more product details if needed
      ];

      for (let detail of orderDetails) {
        await axios.post(
          "http://localhost/dbcategory/cart/orders_details_data.php",
          {
            order_id,
            pid: detail.pid,
            qty: detail.qty,
            amount: detail.amount,
          }
        );
      }

      console.log("Order details saved successfully");
    } catch (error) {
      console.error(
        "Error saving order details:",
        error.response || error.message
      );
      alert("Failed to save order details. Please try again.");
    }
  };

  function handlePayment(order_id, razorpay_order_id) {
    const options = {
      key: "rzp_test_B1gWkpahWOiHhy", // Your Razorpay Key ID
      amount: totalAmount * 100, // Amount is in currency subunits. Default is in paisa (multiply by 100)
      currency: "INR",
      name: "Your Company Name",
      description: "Purchase Description",
      image: "https://example.com/your_logo",
      order_id: razorpay_order_id, // This is the order ID returned by Razorpay in the previous step
      handler: function (response) {
        console.log(response);
        // Handle payment success
        verifyPayment(response);
      },
      prefill: {
        name:
          billingDetails.billing_address_first_name +
          " " +
          billingDetails.billing_address_last_name,
        email: billingDetails.billing_address_email,
        contact: billingDetails.billing_address_phone_number,
      },
      notes: {
        address:
          billingDetails.billing_address_first_name +
          " " +
          billingDetails.billing_address_last_name,
      },
      theme: {
        color: "#3399cc",
      },
      method: {
        upi: true,
        netbanking: true,
        card: true,
        wallet: true,
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", function (response) {
      console.error(response.error);
      alert("Payment failed: " + response.error.description);
    });
  }

  function verifyPayment(paymentResponse) {
    // Extract payment ID and other relevant details from paymentResponse
    const payment_id = paymentResponse.razorpay_payment_id;

    // Send the payment ID to your backend for verification
    axios
      .post("http://localhost:80/api/verify-payment", {
        payment_id: payment_id,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.success) {
          alert("Payment successful!");
          // Redirect or perform other actions upon successful payment
        } else {
          alert("Payment verification failed: " + response.data.message);
        }
      })
      .catch(function (error) {
        console.error("Error verifying payment:", error);
        alert("Payment verification failed: " + error.message);
      });
  }

  // const handlePayment = async (order_id, razorpay_order_id) => {
  //   const options = {
  //     key: "rzp_test_B1gWkpahWOiHhy",
  //     amount: (totalAmount + 10) * 100, // Ensure this is in the smallest currency unit (like paisa for INR)
  //     currency: "INR",
  //     order_id: razorpay_order_id,
  //     description: "Test Transaction",
  //     handler: async function (response) {
  //       const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
  //         response;
  //       console.log(`Order ID => ${order_id}`);
  //       console.log(razorpay_payment_id);
  //       console.log(razorpay_order_id);
  //       console.log(razorpay_signature);
  //       try {
  //         const verifyResponse = await axios.post(
  //           "http://localhost/dbcategory/cart/verify_payment.php",
  //           {
  //             payment_id: razorpay_payment_id,
  //             order_id: razorpay_order_id,
  //             signature: razorpay_signature,
  //             user_id: userId,
  //             total_amount: totalAmount,
  //           }
  //         );

  //         if (verifyResponse.data.success) {
  //           alert("Payment successful and order placed!");
  //         } else {
  //           alert(
  //             "Payment verification failed: " + verifyResponse.data.message
  //           );
  //         }
  //       } catch (error) {
  //         console.error(
  //           "Error verifying payment:",
  //           error.response || error.message
  //         );
  //         alert("Failed to verify payment. Please try again.");
  //       }
  //     },
  //     prefill: {
  //       name: billingDetails.billing_address_first_name,
  //       email: billingDetails.billing_address_email,
  //       contact: billingDetails.billing_address_phone_number,
  //     },
  //     notes: {
  //       address: billingDetails.billing_address_address,
  //     },
  //     theme: {
  //       color: "#F37254",
  //     },
  //     method: {
  //       upi: true,
  //       card: true,
  //       netbanking: true,
  //       wallet: true,
  //     },
  //   };

  //   const rzp1 = new window.Razorpay(options);
  //   rzp1.open();
  //   console.log(options);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reg_id = userId;
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      const billingAndShippingDetails = {
        reg_id,
        ...billingDetails,
        ...(billingDetails.check_box_value ? {} : { ...shippingDetails }),
      };

      console.log(
        "Submitting billing and shipping details:",
        billingAndShippingDetails
      );

      const billingResponse = await axios.post(
        "http://localhost/dbcategory/cart/billing_address_data.php",
        billingAndShippingDetails,
        config
      );

      console.log("Billing API response:", billingResponse.data);

      if (!billingResponse.data.success) {
        throw new Error(
          billingResponse.data.message || "Failed to submit billing details"
        );
      }

      const orderRequestData = {
        reg_id,
        total_amount: totalAmount,
        payment_method: paymentMethod,
      };

      console.log("Order request data:", orderRequestData);

      const orderResponse = await axios.post(
        "http://localhost/dbcategory/cart/order_data_api.php",
        orderRequestData,
        config
      );

      console.log("Order API response:", orderResponse.data);

      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message || "Failed to place order");
      }

      const order_id = orderResponse.data.order_id;
      console.log("Order ID:", order_id);

      if (paymentMethod === "Online") {
        const razorpay_order_id = orderResponse.data.razorpay_order_id;
        if (razorpay_order_id) {
          handlePayment(order_id, razorpay_order_id);
        } else {
          throw new Error("Razorpay order ID is missing");
        }
      } else if (paymentMethod === "COD") {
        alert("Order placed successfully!");
        await saveOrderDetails(order_id);
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to place order: " + error.message);
    }
  };

  return (
    <>
      <div className="container-fluid bg-secondary mb-3">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: 300 }}
        >
          <h1 className="font-weight-semi-bold text-uppercase mb-3">
            Checkout
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <a href="/">Home</a>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Checkout</p>
          </div>
        </div>
      </div>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <div className="mb-4">
              <h4 className="font-weight-semi-bold mb-4">Billing Address</h4>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label>First Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="John"
                      name="billing_address_first_name"
                      value={billingDetails.billing_address_first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Last Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Doe"
                      name="billing_address_last_name"
                      value={billingDetails.billing_address_last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>E-mail</label>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="example@email.com"
                      name="billing_address_email"
                      value={billingDetails.billing_address_email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Mobile No</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="+123 456 789"
                      name="billing_address_phone_number"
                      value={billingDetails.billing_address_phone_number}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Address Line</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="123 Street"
                      name="billing_address_address"
                      value={billingDetails.billing_address_address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Postal Code</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="123"
                      name="billing_address_postal_code"
                      value={billingDetails.billing_address_postal_code}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="newaccount"
                        name="check_box_value"
                        checked={billingDetails.check_box_value}
                        onChange={handleInputChange}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="newaccount"
                      >
                        Shipping address same as billing
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <h4 className="font-weight-semi-bold mb-4">
                      Shipping Address
                    </h4>
                  </div>
                  <div className="col-md-6 form-group">
                    <label>First Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="John"
                      name="shipping_address_first_name"
                      value={shippingDetails.shipping_address_first_name}
                      onChange={handleInputChange}
                      required={!billingDetails.check_box_value}
                      readOnly={billingDetails.check_box_value}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Last Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Doe"
                      name="shipping_address_last_name"
                      value={shippingDetails.shipping_address_last_name}
                      onChange={handleInputChange}
                      required={!billingDetails.check_box_value}
                      readOnly={billingDetails.check_box_value}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>E-mail</label>
                    <input
                      className="form-control"
                      type="email"
                      placeholder="example@email.com"
                      name="shipping_address_email"
                      value={shippingDetails.shipping_address_email}
                      onChange={handleInputChange}
                      required={!billingDetails.check_box_value}
                      readOnly={billingDetails.check_box_value}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Mobile No</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="+123 456 789"
                      name="shipping_address_phone_number"
                      value={shippingDetails.shipping_address_phone_number}
                      onChange={handleInputChange}
                      required={!billingDetails.check_box_value}
                      readOnly={billingDetails.check_box_value}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Address Line</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="123 Street"
                      name="shipping_address_address"
                      value={shippingDetails.shipping_address_address}
                      onChange={handleInputChange}
                      required={!billingDetails.check_box_value}
                      readOnly={billingDetails.check_box_value}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Postal Code</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="123"
                      name="shipping_address_postal_code"
                      value={shippingDetails.shipping_address_postal_code}
                      onChange={handleInputChange}
                      required={!billingDetails.check_box_value}
                      readOnly={billingDetails.check_box_value}
                    />
                  </div>
                </div>
                <div className="col-md-6 form-group">
                  <label>Select Payment Method</label>
                  <select
                    className="form-control"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Online">Online</option>
                    <option value="COD">Cash On Delivery</option>
                  </select>
                </div>
                <div className="col-md-6 form-group">
                  <button className="btn btn-primary" type="submit">
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-4">
            <h5 className="mb-3">Order Total</h5>
            <div className="d-flex justify-content-between">
              <p className="font-weight-medium">Total</p>
              <p className="font-weight-medium">{totalAmount + 10}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
