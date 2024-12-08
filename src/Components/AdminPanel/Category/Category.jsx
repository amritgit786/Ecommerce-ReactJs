import { useState } from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

const Category = () => {
  const [category, setCategory] = useState([]);

  const handleChange = (e) => {
    setCategory({
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
        `http://localhost/dbcategory/insert_category.php`,
        category,
        config
      );
    } catch (error) {
      console.log("Something get wrong");
    }
  };
  return (
    <>
      <div className="content-body">
        <div className="container">
          <h2 className="text-center mt-5">Add Category</h2>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                  <label htmlFor="category">Category :</label>
                  <input
                    type="text"
                    id="category_name"
                    name="category_name"
                    placeholder="Add Category"
                    className="form-control mt-2"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
