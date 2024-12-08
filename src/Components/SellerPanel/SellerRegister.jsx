import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SellerRegister = () => {
  const [sellerDetail, setSellerDetail] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [file, setFile] = useState("");
  const navigate = useNavigate("");
  useEffect(() => {
    async function getAllCity() {
      const res = await axios.get(
        `http://localhost/dbcategory/city/get_all_city_data.php`
      );
      setCityList(res.data);
    }
    getAllCity();

    async function getAllState() {
      const res = await axios.get(
        `http://localhost/dbcategory/state/get_all_state_data.php`
      );
      setStateList(res.data);
    }
    getAllState();
    async function getAllArea() {
      const res = await axios.get(
        `http://localhost/dbcategory/area/get_all_area_data.php`
      );
      setAreaList(res.data);
    }
    getAllArea();
  }, []);
  const handleChange = (e) => {
    setSellerDetail({
      ...sellerDetail,
      [e.target.name]: e.target.value,
    });
  };
  const handleImage = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in sellerDetail) {
      formData.append(key, sellerDetail[key]);
    }
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://localhost/dbcategory/seller/insert_seller_detail.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Seller Registration Form</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="shop_fname">Shop First Name</label>
              <input
                type="text"
                className="form-control"
                id="shop_fname"
                name="shop_fname"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="shop_lname">Shop Last Name</label>
              <input
                type="text"
                className="form-control"
                id="shop_lname"
                name="shop_lname"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="shop_email">Shop Email</label>
              <input
                type="email"
                className="form-control"
                id="shop_email"
                name="shop_email"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="shop_contact">Shop Contact</label>
              <input
                type="text"
                className="form-control"
                id="shop_contact"
                name="shop_contact"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="owner_name">Owner Name</label>
              <input
                type="text"
                className="form-control"
                id="owner_name"
                name="owner_name"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="owner_contact">Owner Contact</label>
              <input
                type="text"
                className="form-control"
                id="owner_contact"
                name="owner_contact"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="reg_no">Registration Number</label>
              <input
                type="text"
                className="form-control"
                id="reg_no"
                name="reg_no"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="gst_no">GST Number</label>
              <input
                type="text"
                className="form-control"
                id="gst_no"
                name="gst_no"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              rows="3"
              required
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="area">Area</label>
              <select
                id="area"
                className="form-control"
                name="area_id"
                required
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select City</option>
                {areaList.map((area, i) => {
                  return (
                    <option key={i} value={area.area_id}>
                      {area.area_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="city">City</label>
              <select
                id="city"
                className="form-control"
                name="city_id"
                required
                onChange={(e) => handleChange(e)}
              >
                <option value="">Select City</option>
                {cityList.map((city, i) => {
                  return (
                    <option key={i} value={city.city_id}>
                      {city.city_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="state">State</label>
              <select
                id="state"
                className="form-control"
                name="state_id"
                required
                onChange={(e) => handleChange(e)}
              >
                {/* <!-- Add options htmlFor states here --> */}
                <option value="">Select State</option>
                {stateList.map((state, i) => {
                  return (
                    <option key={i} value={state.state_id}>
                      {state.state_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              className="form-control-file"
              id="image"
              name="image"
              required
              onChange={(e) => handleImage(e)}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="business_type">Business Type</label>
              <select
                id="business_type"
                className="form-control"
                name="business_type"
                required
                onChange={(e) => handleChange(e)}
              >
                <option>Choose...</option>
                {/* <!-- Add options htmlFor business types here --> */}
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Service">Service</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Food and Beverage">Food and Beverage</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Technology">Technology</option>
                <option value="Consulting">Consulting</option>
                <option value="Construction">Construction</option>
                <option value="Transportation">Transportation</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Register
            </button>
          </div>
          <div className="text-center mt-3">
            <Link to="/sellerlogin" className="text-decoration-none">
              Already registered? Login here
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SellerRegister;
