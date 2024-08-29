import intoImg from '../../image/main_img.jpg';
import './intro.scss';

function Intro() {
  return (
    <div className="intro">
      <div className="container">
        <div className="intro__text-block">
          <h1 className="intro__title">Hello {changeOfSeason()}</h1>
          <h2 className="intro__sub-title">
            Give your wardrobe an upgrade with the Style Edit
          </h2>
          <p className="intro__text">For the whole family!</p>
        </div>
      </div>
      <div className="intro__img-cont">
        <img className="intro__img" src={intoImg} alt="intro" />
      </div>
    </div>
  );
}

const changeOfSeason = () => {
  const date = new Date().getMonth();

  let season;
  switch (date) {
    case 11:
    case 0:
    case 1:
      season = 'winter';
      break;
    case 2:
    case 3:
    case 4:
      season = 'spring ';
      break;
    case 5:
    case 6:
    case 7:
      season = 'summer ';
      break;
    case 8:
    case 9:
    case 10:
      season = 'autumn ';
      break;
  }

  return season;
};

//From everyday essentials to on-trend looks, we’ve got it.
// The online fashion outlet
//Today—and every day—we’re leading with purpose, championing
// inclusivity and creating a sense of belonging.
export default Intro;
