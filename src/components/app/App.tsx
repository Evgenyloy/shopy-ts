import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../header/Header';
import HomePage from '../homePage/HomePage';
import MainLayout from '../mainLayout/MainLayout';
import Footer from '../footer/Footer';
import Product from '../product/Product';
import ProductsList from '../productsList/productsList/ProductsList';
import Basket from '../basket/Basket';
import Checkout from '../checkout/Checkout';
import Favorites from '../favorites/Favorites';

function App() {
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
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
