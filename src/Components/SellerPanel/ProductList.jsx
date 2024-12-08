import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    async function getAllProductsData() {
      const res = await axios.get(
        "http://localhost/dbcategory/product/get_all_product_data.php"
      );

      setProductList(res.data);
    }
    getAllProductsData();
  }, []);
  const handleDelete = async (pid) => {
    await axios.get(
      `http://localhost/dbcategory/product/delete_product_data.php?product_id=${pid}`
    );
    const newData = productList.filter((item) => {
      return item.pid !== pid;
    });
    setProductList(newData);
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-12">
            <h3 className="text-center">Product List</h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Subcategory</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <tr key={product.pid}>
                    <td>{product.product_name}</td>
                    <td>{product.category_id}</td>
                    <td>{product.sucategory_id}</td>
                    <td>{product.description}</td>
                    <td>{product.qty}</td>
                    <td>{product.size}</td>
                    <td>{product.price}</td>
                    <td>
                      <img
                        src={`http://localhost/dbcategory/product/images/${product.image}`}
                        alt={product.product_name}
                        width="50"
                        height="50"
                      />
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/seller/editproduct?product_id=${product.pid}`}
                      >
                        <button className="btn btn-primary btn-sm mx-2">
                          Edit
                        </button>
                      </Link>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product.pid)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
