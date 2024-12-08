import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Liststate = () => {
  const [stateList, setStateList] = useState([]);
  useEffect(() => {
    async function getAllState() {
      const res = await axios.get(
        `http://localhost/dbcategory/state/get_all_state_data.php`
      );
      setStateList(res.data);
    }
    getAllState();
  }, []);
  const handleDelete = async (state_id) => {
    await axios.get(
      `http://localhost/dbcategory/state/delete_state_data.php?state_id=${state_id}`
    );
    const newData = stateList.filter((item) => {
      return item.state_id !== state_id;
    });
    setStateList(newData);
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h4>State Information</h4>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>State Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stateList.map((state, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{state.state_name}</td>
                          <td className="text-center">
                            <Link to={`/admin/edit?state_id=${state.state_id}`}>
                              <button className="btn btn-primary btn-sm mx-2">
                                Edit
                              </button>
                            </Link>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(state.state_id)}
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

export default Liststate;
