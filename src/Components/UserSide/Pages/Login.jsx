import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../store/AuthContext";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(loginData);
      if (res) {
        navigate("/");
      } else {
        alert("Invalid user");
      }
    } catch (error) {
      console.log("Something went wrong");
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
            <div className="text-center mt-3">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="text-decoration-none">
                  Please register first
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
