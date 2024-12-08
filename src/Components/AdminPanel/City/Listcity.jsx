import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Listcity = () => {
  const [cityList, setCityList] = useState([]);
  useEffect(() => {
    async function getAllCity() {
      const res = await axios.get(
        `http://localhost/dbcategory/city/get_all_city_data.php`
      );
      setCityList(res.data);
    }
    getAllCity();
  }, []);
  const handleDelete = async (city_id) => {
    await axios.get(
      `http://localhost/dbcategory/city/delete_city_data.php?city_id=${city_id}`
    );
    const newData = cityList.filter((item) => {
      return item.city_id !== city_id;
    });
    setCityList(newData);
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h4>City Information</h4>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>City Name</th>
                      <th>State Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cityList.map((city, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{city.city_name}</td>
                          <td>{city.state_name}</td>
                          <td className="text-center">
                            <Link
                              to={`/admin/editcity?city_id=${city.city_id}`}
                            >
                              <button className="btn btn-primary btn-sm mx-2">
                                Edit
                              </button>
                            </Link>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(city.city_id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Listcity;
