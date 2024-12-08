import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchStatusActions } from "../../store/fetchStatusSlice";
import { itemsActions } from "../../store/itemsSlice";
import axios from "axios";

const FetchItems = () => {
  // const fetchStatus = useSelector((state) => state.fetchStatus);
  // console.log(fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (fetchStatus.fetchDone) return;

    // const controller = new AbortController();
    // const signal = controller.signal;

    const fetchData = async () => {
      try {
        // dispatch(fetchStatusActions.markFetchingStarted());

        const res = await axios(
          "http://localhost/dbcategory/product/get_all_product_data.php"
        );

        // if (!res.ok) {
        //   console.error(`Network response was not ok: ${res.statusText}`);
        //   throw new Error(`Network response was not ok: ${res.statusText}`);
        // }

        // console.log("API Response:", res.data);

        if (Array.isArray(res.data)) {
          // dispatch(fetchStatusActions.markFetchDone());
          // dispatch(fetchStatusActions.markFetchingFinished());
          dispatch(itemsActions.addInitailsItems(res.data));
        } else {
          console.error("Data format is incorrect:", res.data);
          throw new Error("Data format is incorrect");
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        // dispatch(fetchStatusActions.markFetchingFinished());
      }
    };

    fetchData();
  }, [dispatch]);

  return null;
};

export default FetchItems;
