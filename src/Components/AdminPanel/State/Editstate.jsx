import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Editstate = () => {
  const [searchParams] = useSearchParams();
  const state_id = searchParams.get("state_id");

  const [editState, setEditState] = useState({
    state_id: "",
    state_name: "",
  });

  useEffect(() => {
    async function getSingleStateData() {
      const res = await axios.get(
        `http://localhost/dbcategory/state/get_single_state_data.php?state_id=${state_id}`
      );
      console.log(res.data);
      setEditState(res.data);
    }
    getSingleStateData();
  }, [state_id]);

  const handleChange = (e) => {
    setEditState({
      ...editState,
      [e.target.name]: e.target.value,
    });
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
        `http://localhost/dbcategory/state/update_state_data.php`,
        editState,
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
                <h4>Edit State Information</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mt-3">
                    {/* <label htmlFor="stateName">State Id</label> */}
                    <input
                      type="hidden"
                      className="form-control mt-3"
                      id="state_id"
                      name="state_id"
                      value={editState.state_id}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="stateName">State Name</label>
                    <input
                      type="text"
                      className="form-control mt-3"
                      id="state_name"
                      name="state_name"
                      value={editState.state_name}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">
                    Edit State
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

export default Editstate;
