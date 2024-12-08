import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Inquiry = () => {
  const [detail, setDetail] = useState({});

  const handleChange = (e) => {
    setDetail({
      ...detail,
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
        `http://localhost/dbcategory/inquiry/insert_inquiry_data.php`,
        detail,
        config
      );
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center fw-bold">Contact Us</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fname"
                      name="fname"
                      placeholder="First Name"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lname"
                      name="lname"
                      placeholder="Last Name"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="contact">Contact</label>
                    <input
                      type="text"
                      className="form-control"
                      id="contact"
                      name="contact"
                      placeholder="Contact"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Type your message here"
                  onChange={(e) => handleChange(e)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inquiry;
