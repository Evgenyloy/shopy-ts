import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../header/Header';
import HomePage from '../homePage/HomePage';
import MainLayout from '../mainLayout/MainLayout';
import Footer from '../footer/Footer';
import Product from '../product/Product';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/product/:id" element={<Product />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
