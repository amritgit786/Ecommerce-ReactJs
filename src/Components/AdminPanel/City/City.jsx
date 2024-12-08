import { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const City = () => {
  const [stateList, setStateList] = useState([]);
  const [city, setCity] = useState([]);
  useEffect(() => {
    async function getAllState() {
      const res = await axios.get(
        `http://localhost/dbcategory/state/get_all_state_data.php`
      );
      console.log(res.data);
      setStateList(res.data);
    }
    getAllState();
  }, []);
  const handleChange = (e) => {
    setCity((prevcity) => ({
      ...prevcity,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(city);
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      await axios.post(
        `http://localhost/dbcategory/city/add_city_data.php`,
        city,
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
                <h4>Add City Information</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="city_name">City Name</label>
                    <input
                      type="text"
                      className="form-control mt-2"
                      id="city_name"
                      name="city_name"
                      required
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="state_name">State</label>
                    <select
                      className="form-select mt-2"
                      id="state_id"
                      name="state_id"
                      value={city.state_id}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      required
                    >
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

                  <button type="submit" className="btn btn-primary mt-3">
                    Add City
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

export default City;
