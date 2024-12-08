import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Listarea = () => {
  const [areaList, setAreaList] = useState([]);
  useEffect(() => {
    async function getAllArea() {
      const res = await axios.get(
        `http://localhost/dbcategory/area/get_all_area_data.php`
      );
      setAreaList(res.data);
    }
    getAllArea();
  }, []);
  const handleDelete = async (area_id) => {
    await axios.get(
      `http://localhost/dbcategory/area/delete_area_data.php?area_id=${area_id}`
    );
    const newData = areaList.filter((item) => {
      return item.area_id !== area_id;
    });
    setAreaList(newData);
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h4>Area Information</h4>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Area Name</th>
                      <th>City Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {areaList.map((area, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{area.area_name}</td>
                          <td>{area.city_name}</td>
                          <td className="text-center">
                            <Link
                              to={`/admin/editarea?area_id=${area.area_id}`}
                            >
                              <button className="btn btn-primary btn-sm mx-2">
                                Edit
                              </button>
                            </Link>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(area.area_id)}
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

export default Listarea;
