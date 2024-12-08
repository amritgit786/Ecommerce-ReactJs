import { Route, Routes } from "react-router-dom";
import Layout from "./Components/UserSide/Layout";
import Home from "./Components/UserSide/Pages/Home";
import Shop from "./Components/UserSide/Pages/Shop";
import ShopDetail from "./Components/UserSide/Pages/ShopDetail";
import Cart from "./Components/UserSide/Pages/Cart";
import Checkout from "./Components/UserSide/Pages/Checkout";
import Login from "./Components/UserSide/Pages/Login";
import Contact from "./Components/UserSide/Pages/Contact";
import Register from "./Components/UserSide/Pages/Register";
import Header from "./Components/UserSide/Header";
import Footer from "./Components/UserSide/Footer";
import Navbar from "./Components/UserSide/Navbar";
import AuthProvider from "./store/AuthContext";
import SellerRegister from "./Components/SellerPanel/SellerRegister";
import SellerLogin from "./Components/SellerPanel/SellerLogin";
import { Provider } from "react-redux";
import onlineStore from "./store";
import FetchItems from "./Components/UserSide/FetchItems";
import Feedback from "./Components/UserSide/Feedback";

const UserRoutes = () => {
  return (
    <>
      <Provider store={onlineStore}>
        <AuthProvider>
          <FetchItems />
          <Header />
          <Navbar />

          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="shopdetail" element={<ShopDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="contact" element={<Contact />} />
              <Route path="/sellerregister" element={<SellerRegister />} />
              <Route path="/sellerlogin" element={<SellerLogin />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>

          <Footer />
        </AuthProvider>
      </Provider>
    </>
  );
};

export default UserRoutes;
