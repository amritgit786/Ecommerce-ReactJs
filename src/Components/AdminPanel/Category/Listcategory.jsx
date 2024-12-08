import { useState, useEffect } from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Listcategory = () => {
  const [categorylist, setCategorylist] = useState([]);
  useEffect(() => {
    async function getAllCategory() {
      const res = await axios.get(
        `http://localhost/dbcategory/get_all_category.php`
      );
      console.log(res.data);
      setCategorylist(res.data);
    }
    getAllCategory();
  }, []);

  const handleDelete = async (category_id) => {
    await axios.get(
      `http://localhost/dbcategory/delete_category_data.php?category_id=${category_id}`
    );
    const newData = categorylist.filter((item) => {
      return item.category_id !== category_id;
    });
    setCategorylist(newData);
  };
  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Category Table</h4>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered zero-configuration">
                      <thead>
                        <tr>
                          <th className="text-center">Category No</th>
                          <th className="text-center">Category Name</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categorylist.map((category, i) => {
                          return (
                            <tr key={i}>
                              <td className="text-center">{i + 1}</td>
                              <td className="text-center">
                                {category.category_name}
                              </td>
                              <td className="text-center">
                                <Link
                                  to={`/admin/editcategory?category_id=${category.category_id}`}
                                >
                                  <button className="btn btn-info mx-1">
                                    Edit
                                  </button>
                                </Link>

                                <button
                                  className="btn btn-danger mx-1"
                                  onClick={() =>
                                    handleDelete(category.category_id)
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

export default Listcategory;
