import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Editcity = () => {
  const [searchParams] = useSearchParams();
  const city_id = searchParams.get("city_id");

  const [singleCity, setSingleCity] = useState({
    city_id: "",
    city_name: "",
    state_id: "",
  });
  const [stateList, setStateList] = useState([]);
  useEffect(() => {
    async function getSingleCity() {
      const res = await axios.get(
        `http://localhost/dbcategory/city/get_single_city_data.php?city_id=${city_id}`
      );
      console.log(res.data);
      setSingleCity(res.data);
    }
    async function getAllState() {
      const res1 = await axios.get(
        `http://localhost/dbcategory/state/get_all_state_data.php`
      );
      console.log(res1.data);
      setStateList(res1.data);
    }
    getSingleCity();
    getAllState();
  }, [city_id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSingleCity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      await axios.post(
        `http://localhost/dbcategory/city/update_city_data.php`,
        singleCity,
        config
      );
    } catch (error) {
      console.log("Something get wrong");
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Edit City Information</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                  {/* <label htmlFor="stateName">State Id</label> */}
                  <input
                    type="hidden"
                    className="form-control mt-3"
                    id="city_id"
                    name="city_id"
                    value={singleCity.city_id}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="stateName">City Name</label>
                  <input
                    type="text"
                    className="form-control mt-3"
                    id="city_name"
                    name="city_name"
                    value={singleCity.city_name}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="state_name">State</label>
                  <select
                    className="form-select mt-2"
                    id="state_id"
                    name="state_id"
                    value={singleCity.state_id}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                  >
                    <option value="">Select State</option>
                    {stateList.map((state) => {
                      return (
                        <option key={state.state_id} value={state.state_id}>
                          {state.state_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Edit City
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editcity;
