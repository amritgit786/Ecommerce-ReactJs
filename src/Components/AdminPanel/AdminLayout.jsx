import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import DynamicAssetLoader from "../../DynamicAssetsLoader";

const AdminLayout = () => {
  return (
    <>
      <DynamicAssetLoader />
      <Sidebar />
      <div id="main-wrapper">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
