import './about.scss';

const About = () => {
  return (
    <div className="about">
      <div className="about__inner">
        <h2>React educational project</h2>
        <p>
          gitHub:{' '}
          <a href="https://github.com/Evgenyloy/shopy" target="blanck">
            shopy
          </a>
        </p>
        <p>
          api:{' '}
          <a href="https://fakestoreapi.com" target="blanck">
            fakestoreapi.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default About;
