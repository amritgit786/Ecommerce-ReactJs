import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/AdminPanel/Pages/Dashboard";
import Category from "./Components/AdminPanel/Category/Category";
import Listcategory from "./Components/AdminPanel/Category/Listcategory";
import Subcategory from "./Components/AdminPanel/Subcategory/Subcategory";
import Listsubcategories from "./Components/AdminPanel/Subcategory/Listsubcategories";
import Editcategory from "./Components/AdminPanel/Category/Editcategory";
import Editsubcategory from "./Components/AdminPanel/Subcategory/Editsubcategory";
import Area from "./Components/AdminPanel/Area/Area";
import Editarea from "./Components/AdminPanel/Area/Editarea";
import Listarea from "./Components/AdminPanel/Area/Listarea";
import City from "./Components/AdminPanel/City/City";
import Editcity from "./Components/AdminPanel/City/Editcity";
import Listcity from "./Components/AdminPanel/City/Listcity";
// import Feedback from "./Components/AdminPanel/Feedback/Feedback";
import Inquiry from "./Components/AdminPanel/Inquiry/Inquiry";
import Login from "./Components/AdminPanel/Login/Login";
import Register from "./Components/AdminPanel/Register/Register";
import Editstate from "./Components/AdminPanel/State/Editstate";
import Liststate from "./Components/AdminPanel/State/Liststate";
import State from "./Components/AdminPanel/State/State";

import AdminLayout from "./Components/AdminPanel/AdminLayout";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="listcategory" element={<Listcategory />} />
          <Route path="editcategory" element={<Editcategory />} />
          <Route path="subcategory" element={<Subcategory />} />
          <Route path="listsubcategory" element={<Listsubcategories />} />
          <Route path="editsubcategory" element={<Editsubcategory />} />
          <Route path="state" element={<State />} />
          <Route path="liststate" element={<Liststate />} />
          <Route path="editstate" element={<Editstate />} />
          <Route path="city" element={<City />} />
          <Route path="listcity" element={<Listcity />} />
          <Route path="editcity" element={<Editcity />} />
          <Route path="area" element={<Area />} />
          <Route path="listarea" element={<Listarea />} />
          <Route path="editarea" element={<Editarea />} />

          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="contact" element={<Inquiry />} />
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
