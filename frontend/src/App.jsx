import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import UserHome from "./Pages/UserHome";
import UserProductDetail from "./Pages/UserProductDetail";
import Cart from "./Pages/Cart";
import Home from "./Pages/UserHome";
import AddProducts from "./Pages/AddProducts";
import ProductDetail from "./Pages/UserProductDetail";
import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/products/detail/:productId" element={<UserProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />

        {/* Admin routes */}
        <Route path="/admin" element={<Home />} />
        <Route path="/admin/products/add" element={<AddProducts />} />
        <Route path="/admin/products/detail/:productId" element={<ProductDetail />} />
      </Routes>
      {!isLoginPage && <Footer />} 
    
  

    </div>
  );
};

export default App;
