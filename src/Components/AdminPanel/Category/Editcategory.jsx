import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Editcategory = () => {
  const [searchParams] = useSearchParams();
  const category_id = searchParams.get("category_id");

  const [singleCategory, setSingleCategory] = useState([]);

  useEffect(() => {
    async function getSingleCategory() {
      const res = await axios.get(
        `http://localhost/dbcategory/get_single_category_data.php?category_id=${category_id}`
      );
      setSingleCategory(res.data);
    }
    getSingleCategory();
  }, [category_id]);
  const handleChange = (e) => {
    setSingleCategory({
      ...singleCategory,
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
        `http://localhost/dbcategory/category_data_update.php`,
        singleCategory,
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
          <h2 className="text-center mt-5">Edit Category</h2>
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
                    value={singleCategory.category_name}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                  Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editcategory;
