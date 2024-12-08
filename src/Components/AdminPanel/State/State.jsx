import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const State = () => {
  const [state, setState] = useState();
  const handleChange = (e) => {
    setState({
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
        `http://localhost/dbcategory/state/add_state_data.php`,
        state,
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
                <h4>Add State Information</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mt-3">
                    <label htmlFor="stateName">State Name</label>
                    <input
                      type="text"
                      className="form-control mt-3"
                      id="state_name"
                      name="state_name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">
                    Add State
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

export default State;
