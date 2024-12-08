import { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Area = () => {
  const [cityList, setCityList] = useState([]);
  const [area, setArea] = useState([]);
  useEffect(() => {
    async function getAllCity() {
      const res = await axios.get(
        `http://localhost/dbcategory/city/get_all_city_data.php`
      );
      console.log(res.data);
      setCityList(res.data);
    }
    getAllCity();
  }, []);
  const handleChange = (e) => {
    setArea((prevcity) => ({
      ...prevcity,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(area);
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      await axios.post(
        `http://localhost/dbcategory/area/add_area_data.php`,
        area,
        config
      );
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
              <div className="card-header">
                <h4>Add Area Information</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="area_name">Area Name</label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      id="area_name"
                      name="area_name"
                      required
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="city_name">City</label>
                    <select
                      className="form-select mt-2"
                      id="city_id"
                      name="city_id"
                      value={cityList.city_id}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      required
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

                  <button type="submit" className="btn btn-primary mt-3">
                    Add Area
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Area;
