import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SellerLogin = () => {
  const [loginData, setLoginData] = useState({
    shop_email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const res = await axios.post(
        `http://localhost/dbcategory/seller/seller_login.php`,
        loginData,
        config
      );
      console.log(res.data);
      if (
        res.data.shop_email === loginData.shop_email &&
        res.data.password === loginData.password
      ) {
        localStorage.setItem("seller_id", res.data.seller_id);
        alert("Login Successfull");
        navigate("/seller");
      } else {
        alert("Please enter valid email & password!");
      }
    } catch (error) {
      console.log("Something get wrong");
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center">Login</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="shop_email"
                      placeholder="Enter email"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Login
                  </button>
                </form>
                <div className="mt-3 text-center">
                  <Link to="/sellerregister">Register Here</Link>
                </div>
                <div className="mt-2 text-center">
                  <a href="#">Forgot Password?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerLogin;
