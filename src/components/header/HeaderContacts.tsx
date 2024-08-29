import { IoMdMailOpen } from 'react-icons/io';
import { RiFacebookFill } from 'react-icons/ri';
import { BsTwitter, BsInstagram, BsFillTelephoneFill } from 'react-icons/bs';
import { TfiGoogle } from 'react-icons/tfi';
import './headerContacts.scss';

const HeaderContacts = () => {
  return (
    <div className="header-contacts">
      <div className="container">
        <div className="header-contacts__inner">
          <div className="header-contacts__inner-col1 contacts">
            <div className="contacts__mail">
              <IoMdMailOpen /> info@shopy.com
            </div>
            <div className="contacts__tel">
              <BsFillTelephoneFill /> 996 - 5553 - 453
            </div>
          </div>
          <div className="header-contacts__inner-col2">
            <ul className="social">
              <li className="social__item">
                <a href="https://ru-ru.facebook.com" className="social__link">
                  <RiFacebookFill />
                </a>
              </li>
              <li className="social__item">
                <a href="https://twitter.com/?lang=ru" className="social__link">
                  <BsTwitter />
                </a>
              </li>
              <li className="social__item">
                <a href="https://www.google.ru" className="social__link">
                  <TfiGoogle />
                </a>
              </li>
              <li className="social__item">
                <a href="https://www.instagram.com" className="social__link">
                  <BsInstagram />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderContacts;
