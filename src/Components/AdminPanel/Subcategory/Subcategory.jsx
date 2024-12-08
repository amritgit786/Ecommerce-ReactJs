import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Subcategory = () => {
  const [subcategory, setsubCategory] = useState([]);
  const [formData, setformData] = useState([]);

  useEffect(() => {
    async function getCategory() {
      const res = await axios.get(
        `http://localhost/dbcategory/get_all_category.php`
      );
      console.log(res.data);
      setsubCategory(res.data);
    }
    getCategory();
  }, []);

  const handleChange = (e) => {
    setformData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      await axios.post(
        `http://localhost/dbcategory/insert_subcategory.php`,
        formData,
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
          <h2 className="text-center">Add SubCategory</h2>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                  <label htmlFor="category">Subcategory :</label>
                  <input
                    type="text"
                    id="subcategory_name"
                    name="subcategory_name"
                    placeholder="Add Subcategory"
                    className="form-control mt-2"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="category">Category :</label>
                  <select
                    className="form-control mt-2"
                    value={formData.category_id}
                    name="category_id"
                    onChange={handleChange}
                  >
                    {subcategory.map((category, i) => (
                      <option key={i} value={category.category_id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
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

export default Subcategory;
