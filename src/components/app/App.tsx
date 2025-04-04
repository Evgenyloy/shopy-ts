import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../hooks/hooks";
import { updateUserInformation } from "./useUserData";
import Header from "../header/Header";
import HomePage from "../homePage/HomePage";
import MainLayout from "../mainLayout/MainLayout";
import Footer from "../footer/Footer";
import Product from "../product/Product";
import ProductsList from "../productsList/productsList/ProductsList";
import Basket from "../basket/Basket";
import Checkout from "../checkout/Checkout";
import Favorites from "../favorites/Favorites";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../registerPage/RegisterPage";
import About from "../about/About";

function App() {
  const { orders, favorites, user, isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      updateUserInformation(user, orders, favorites);
    }

    localStorage.setItem(
      "userData",
      JSON.stringify({ orders, favorites, email: "", uid: "" })
    );
  }, [orders, favorites]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
