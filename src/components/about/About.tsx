import "./about.scss";

const About = () => {
  return (
    <div className="about">
      <div className="about__inner">
        <h2 className="about__title">React portfolio project</h2>
        <p className="about__text">
          GitHub:{" "}
          <a
            className="about__link"
            href="https://github.com/Evgenyloy/shopy-ts"
            target="blanc"
          >
            Shopy
          </a>
        </p>
        <p className="about__text">
          API:{" "}
          <a
            className="about__link"
            href="https://fakestoreapi.com"
            target="blanc"
          >
            Fakestoreapi.com
          </a>
        </p>
        <p className="about__text">
          Stack: Redux, RTK Query, React Router Dom, Firebase
        </p>
      </div>
    </div>
  );
};

export default About;
