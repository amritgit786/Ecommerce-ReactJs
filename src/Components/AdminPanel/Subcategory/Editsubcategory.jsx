import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Editsubcategory = () => {
  const [searchParams] = useSearchParams();
  const sucategory_id = searchParams.get("sucategory_id");

  const [singleSubCategory, setSingleSubCategory] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getSingleSubCategory() {
      const subCategoryResponse = await axios.get(
        `http://localhost/dbcategory/get_single_subcategory_data.php?sucategory_id=${sucategory_id}`
      );
      //   console.log(subCategoryResponse.data);
      setSingleSubCategory(
        subCategoryResponse.data
        // subcategory_name: subCategoryResponse.data.subcategory_name,
        // category_id: subCategoryResponse.data.category_id,
      );
    }
    async function getAllCategories() {
      try {
        const res1 = await axios.get(
          `http://localhost/dbcategory/get_all_category.php`
        );
        // console.log(res1.data);
        setCategories(res1.data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    }
    getSingleSubCategory();
    getAllCategories();
  }, [sucategory_id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSingleSubCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(singleSubCategory);
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      await axios.post(
        `http://localhost/dbcategory/edit_subcategory_data.php`,
        singleSubCategory,
        // {
        //   subcategory_name: singleSubCategory.subcategory_name,
        //   category_id: singleSubCategory.category_id,
        // },
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
          <h2 className="text-center">Edit SubCategory</h2>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                  <label htmlFor="category">Subcategory :</label>
                  <input
                    type="text"
                    id="subcategory_name"
                    name="subcategory_name"
                    value={singleSubCategory.subcategory_name}
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
                    value={singleSubCategory.category_id}
                    name="category_id"
                    onChange={handleChange}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.category_name}
                      </option>
                    ))}
                    {/* Assuming singleSubCategory contains the category data */}
                    {/* <option value={singleSubCategory.category_id}>
                      {singleSubCategory.category_name}
                    </option> */}
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

export default Editsubcategory;
