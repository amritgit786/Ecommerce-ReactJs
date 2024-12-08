import axios from "axios";
import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = {
      email: loginData.email,
      password: loginData.password,
    };
    try {
      console.log(sendData);
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const res = await axios.post(
        `http://localhost/dbcategory/register/login.php`,
        sendData,
        config
      );
      if (
        res.data.email === sendData.email &&
        res.data.password === sendData.password
      ) {
        localStorage.setItem("reg_id", JSON.stringify(res.data.reg_id));
        localStorage.setItem("email", JSON.stringify(res.data.email));
        localStorage.setItem(
          "userName",
          res.data.first_name + " " + res.data.last_name
        );
        alert(`Welcome: ${res.data.first_name + " " + res.data.last_name}`);
        navigate("/feedback");
      } else {
        alert("Invalid user");
      }
    } catch (error) {
      console.log("Something get Wrong Data");
    }
  };
  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center fw-bold">Login</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group mt-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control mt-2"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control mt-2"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                  value={loginData.password}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
