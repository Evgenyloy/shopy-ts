import Intro from './Intro';
import Arrivals from './Arrivals';
import BestSales from './BestSales';
import NewsLetter from '../newsLetter/NewsLetter';
import './homePage.scss';

const HomePage = () => {
  return (
    <div className="home-page">
      <Intro />
      <div className="container">
        <Arrivals />
        <BestSales />
        <NewsLetter />
      </div>
    </div>
  );
};

export default HomePage;
