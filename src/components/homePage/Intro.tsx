import intoImg from "../../image/main_img.jpg";
import { getCurrentSeason } from "./utils";
import "./intro.scss";

const INTRO_CONTENT = {
  title: (season: string) => `Hello ${season}`,
  subtitle: "Give your wardrobe an upgrade with the Style Edit",
  description: "For the whole family!",
};

function Intro() {
  return (
    <div className="intro">
      <div className="container">
        <div className="intro__text-block">
          <h1 className="intro__title">
            {INTRO_CONTENT.title(getCurrentSeason())}
          </h1>
          <h2 className="intro__sub-title">{INTRO_CONTENT.subtitle}</h2>
          <p className="intro__text">{INTRO_CONTENT.description}</p>
        </div>
      </div>
      <div className="intro__img-cont">
        <img
          className="intro__img"
          src={intoImg}
          alt="intro-image"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default Intro;
