import axios from "axios";
import { useEffect, useState } from "react";

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user_id1 = localStorage.getItem("reg_id");
    const user_id = JSON.parse(user_id1);
    if (user_id) {
      setUserId(user_id);
    }
  }, []);

  const handleChange = (e) => {
    setFeedbackData({
      ...feedbackData,
      [e.target.name]: e.target.value,
      reg_id: userId,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(feedbackData);
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      await axios.post(
        `http://localhost/dbcategory/feedback/insert_feedback_data.php`,
        feedbackData,
        config
      );
    } catch (error) {
      console.log("Something get wrong");
    }
  };
  return (
    <>
      <div className="content-body">
        <div className="container mt-5">
          <h2 className="text-center fw-bold">Feedback Form</h2>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="hidden"
                    name="reg_id"
                    id="reg_id"
                    value={userId}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="rating">Rating</label>
                  <select
                    className="form-control mt-2"
                    id="rating"
                    name="rating"
                    onChange={handleChange}
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    className="form-control mt-2"
                    id="comment"
                    name="comment"
                    rows="5"
                    placeholder="Type your comment here"
                    onChange={handleChange}
                  ></textarea>
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

export default Feedback;
