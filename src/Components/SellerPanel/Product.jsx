import { useState, useEffect } from "react";
import axios from "axios";

const Product = () => {
  const initialProductData = {
    product_name: "",
    category_id: "",
    sucategory_id: "",
    description: "",
    qty: "",
    size: "",
    price: "",
    seller_id: "",
  };
  const [productData, setProductData] = useState(initialProductData);
  const [categorylist, setCategorylist] = useState([]);
  const [subcategorylist, setSubCategorylist] = useState([]);
  const [file, setFile] = useState(null);
  const [sellerId, setSellerId] = useState("");

  useEffect(() => {
    const seller_id1 = localStorage.getItem("seller_id");

    if (seller_id1) {
      const seller_id = JSON.parse(seller_id1);
      setSellerId(seller_id);
      setProductData((prevData) => ({ ...prevData, seller_id }));
    }

    const getAllCategory = async () => {
      const res = await axios.get(
        `http://localhost/dbcategory/get_all_category.php`
      );
      setCategorylist(res.data);
    };
    getAllCategory();

    const getAllSubCategory = async () => {
      const res = await axios.get(
        `http://localhost/dbcategory/get_all_subcategory.php`
      );
      setSubCategorylist(res.data);
    };
    getAllSubCategory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
      seller_id: sellerId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = new FormData();

    // Append each field to the FormData object
    for (const key in productData) {
      newData.append(key, productData[key]);
    }
    newData.append("file", file);

    try {
      await axios.post(
        `http://localhost/dbcategory/product/insert_product_detail.php`,
        newData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Product Added Successfully");
      setProductData(initialProductData);
      setFile(null);
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };

  return (
    <>
      <div className="content-body">
        <div className="container-fluid mt-3">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title text-center">Product Form</h3>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                      <input
                        type="hidden"
                        name="seller_id"
                        id="seller_id"
                        value={sellerId}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="productName">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="product_name"
                        id="productName"
                        placeholder="Enter product name"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="selectCategory">Select Category</label>
                      <select
                        className="form-control"
                        name="category_id"
                        id="selectCategory"
                        onChange={handleChange}
                      >
                        <option>select Category</option>
                        {categorylist.map((category) => (
                          <option
                            key={category.category_id}
                            value={category.category_id}
                          >
                            {category.category_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="selectSubcategory">
                        Select Subcategory
                      </label>
                      <select
                        className="form-control"
                        name="sucategory_id"
                        id="selectSubcategory"
                        onChange={handleChange}
                      >
                        <option>Select Subcategory</option>
                        {subcategorylist.map((subcategory) => (
                          <option
                            key={subcategory.sucategory_id}
                            value={subcategory.sucategory_id}
                          >
                            {subcategory.subcategory_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        placeholder="Enter product description"
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                          type="number"
                          className="form-control"
                          id="quantity"
                          name="qty"
                          placeholder="Enter quantity"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="size">Size</label>
                        <input
                          type="text"
                          className="form-control"
                          id="size"
                          name="size"
                          placeholder="Enter size"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="price">Price</label>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          name="price"
                          placeholder="Enter price"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="productImages">Product Images</label>
                      <input
                        type="file"
                        className="form-control-file"
                        id="productImages"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <small className="form-text text-muted">
                        Upload up to 4 images.
                      </small>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
