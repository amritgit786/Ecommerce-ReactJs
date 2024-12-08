import UserRoutes from "./UserRoutes";
import SellerRoutes from "./SellerRoutes";
import AdminRoutes from "./AdminRoutes";
import { Route, Routes } from "react-router-dom";

const RouterComp = () => {
  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/seller/*" element={<SellerRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </>
  );
};

export default RouterComp;
