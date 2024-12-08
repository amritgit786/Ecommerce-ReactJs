import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Editarea = () => {
  const [searchParams] = useSearchParams();
  const area_id = searchParams.get("area_id");

  const [singleArea, setSingleArea] = useState({
    area_id: "",
    area_name: "",
    city_id: "",
  });
  const [cityList, setCityList] = useState([]);
  useEffect(() => {
    async function getSingleArea() {
      const res = await axios.get(
        `http://localhost/dbcategory/area/get_single_area_data.php?area_id=${area_id}`
      );
      console.log(res.data);
      setSingleArea(res.data);
    }
    async function getAllCity() {
      const res1 = await axios.get(
        `http://localhost/dbcategory/city/get_all_city_data.php`
      );
      console.log(res1.data);
      setCityList(res1.data);
    }
    getSingleArea();
    getAllCity();
  }, [area_id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSingleArea((prevState) => ({
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
        `http://localhost/dbcategory/area/update_area_data.php`,
        singleArea,
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
              <h4>Edit Area Information</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                  {/* <label htmlFor="stateName">State Id</label> */}
                  <input
                    type="hidden"
                    className="form-control mt-3"
                    id="area_id"
                    name="area_id"
                    value={singleArea.area_id}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="stateName">Area Name</label>
                  <input
                    type="text"
                    className="form-control mt-3"
                    id="area_name"
                    name="area_name"
                    value={singleArea.area_name}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="city_name">City</label>
                  <select
                    className="form-select mt-2"
                    id="city_id"
                    name="city_id"
                    value={singleArea.city_id}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    required
                  >
                    <option value="">Select City</option>
                    {cityList.map((city) => {
                      return (
                        <option key={city.city_id} value={city.city_id}>
                          {city.city_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Edit Area
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editarea;
