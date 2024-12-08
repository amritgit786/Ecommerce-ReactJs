import { useState, useEffect } from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Listsubcategories = () => {
  const [subcategorylist, setSubCategorylist] = useState([]);
  useEffect(() => {
    async function getAllSubCategory() {
      const res = await axios.get(
        `http://localhost/dbcategory/get_all_subcategory.php`
      );
      console.log(res.data);
      setSubCategorylist(res.data);
    }
    getAllSubCategory();
  }, []);
  const handleDelete = async (sucategory_id) => {
    await axios.get(
      `http://localhost/dbcategory/delete_subcategory_data.php?sucategory_id=${sucategory_id}`
    );
    const new_data = subcategorylist.filter((item) => {
      return item.sucategory_id !== sucategory_id;
    });
    setSubCategorylist(new_data);
  };
  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Subcategory Table</h4>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered zero-configuration">
                      <thead>
                        <tr>
                          <th className="text-center">SubCategory No</th>
                          <th className="text-center">SubCategory Name</th>
                          <th className="text-center">Category Name</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subcategorylist.map((subcategory, i) => {
                          return (
                            <tr key={i}>
                              <td className="text-center">{i + 1}</td>
                              <td className="text-center">
                                {subcategory.subcategory_name}
                              </td>
                              <td className="text-center">
                                {subcategory.category_name}
                              </td>
                              <td className="text-center">
                                <Link
                                  to={`/admin/editsubcategory?sucategory_id=${subcategory.sucategory_id}`}
                                >
                                  <button className="btn btn-info mx-1">
                                    Edit
                                  </button>
                                </Link>
                                <button
                                  className="btn btn-danger mx-1"
                                  onClick={() =>
                                    handleDelete(subcategory.sucategory_id)
                                  }
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
        </div>
      </div>
    </>
  );
};

export default Listsubcategories;
