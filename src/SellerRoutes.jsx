import { Routes, Route } from "react-router-dom";
// import Sidebar from "./Components/SellerPanel/Sidebar";
import Dashboard from "./Components/SellerPanel/Dashboard";
// import SellerRegister from "./Components/SellerPanel/SellerRegister";
// import SellerLogin from "./Components/SellerPanel/SellerLogin";
import Product from "./Components/SellerPanel/Product";
// import DynamicAssetLoader from "./DynamicAssetsLoader";
import SellerLayout from "./Components/SellerPanel/SellerLayout";
import ProductList from "./Components/SellerPanel/ProductList";

const SellerRoutes = () => {
  return (
    <>
      {/* <DynamicAssetLoader />
      <Sidebar />
      <div id="main-wrapper"> */}
      <Routes>
        <Route element={<SellerLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="productlist" element={<ProductList />} />
        </Route>
      </Routes>
      {/* </div> */}
    </>
  );
};

export default SellerRoutes;
