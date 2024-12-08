import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [register, setRegister] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [areaList, setAreaList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getAllState() {
      const res = await axios.get(
        `http://localhost/dbcategory/state/get_all_state_data.php`
      );
      setStateList(res.data);
    }
    getAllState();

    async function getAllCity() {
      const res = await axios.get(
        `http://localhost/dbcategory/city/get_all_city_data.php`
      );
      setCityList(res.data);
    }
    getAllCity();

    async function getAllArea() {
      const res = await axios.get(
        `http://localhost/dbcategory/area/get_all_area_data.php`
      );
      setAreaList(res.data);
    }
    getAllArea();
  }, []);

  const handleOnChange = (e) => {
    setRegister((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(register);
    try {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      await axios.post(
        `http://localhost/dbcategory/register/register.php`,
        register,
        config
      );
      navigate("/login");
    } catch (error) {
      console.log("Something get Wrong Data");
    }
  };
  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center fw-bold">Registration Form</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group mt-2">
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  id="dob"
                  name="dob"
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div className="form-group mt-2">
                <label>Gender</label>
                <br />
                <div className="form-check form-check-inline mt-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    onChange={(e) => handleOnChange(e)}
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline mt-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    onChange={(e) => handleOnChange(e)}
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline mt-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="other"
                    value="other"
                    onChange={(e) => handleOnChange(e)}
                  />
                  <label className="form-check-label" htmlFor="other">
                    Other
                  </label>
                </div>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="address">Address</label>
                <textarea
                  className="form-control mt-2"
                  id="address"
                  name="address"
                  placeholder="1234 Main St"
                  onChange={(e) => handleOnChange(e)}
                ></textarea>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control mt-2"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="contact">Contact</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  id="contact"
                  name="contact"
                  placeholder="Contact"
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  name="state_id"
                  className="form-control mt-2"
                  onChange={(e) => handleOnChange(e)}
                >
                  <option>Choose...</option>
                  {stateList.map((state) => {
                    return (
                      <option key={state.state_id} value={state.state_id}>
                        {state.state_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="city">City</label>
                <select
                  id="city"
                  name="city_id"
                  className="form-control mt-2"
                  onChange={(e) => handleOnChange(e)}
                >
                  <option>Choose...</option>
                  {cityList.map((city) => {
                    return (
                      <option key={city.city_id} value={city.city_id}>
                        {city.city_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="area">Area</label>
                <select
                  id="area"
                  name="area_id"
                  className="form-control mt-2"
                  onChange={(e) => handleOnChange(e)}
                >
                  <option>Choose...</option>
                  {areaList.map((area) => {
                    return (
                      <option key={area.area_id} value={area.area_id}>
                        {area.area_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control mt-2"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div className="row justify-content-center">
                <div className="col-md-3">
                  <button type="submit" className="btn btn-lg btn-primary mt-3">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
