import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
// import Header from "./Header";
import DynamicAssetLoader from "../../DynamicAssetsLoader";

const SellerLayout = () => {
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

export default SellerLayout;
