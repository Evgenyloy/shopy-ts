import './about.scss';

const About = () => {
  return (
    <div className="about">
      <div className="about__inner">
        <h2 className="about__title">React educational project</h2>
        <p className="about__text">
          gitHub:{' '}
          <a
            className="about__link"
            href="https://github.com/Evgenyloy/shopy"
            target="blanc"
          >
            shopy
          </a>
        </p>
        <p className="about__text">
          api:{' '}
          <a
            className="about__link"
            href="https://fakestoreapi.com"
            target="blanc"
          >
            fakestoreapi.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
