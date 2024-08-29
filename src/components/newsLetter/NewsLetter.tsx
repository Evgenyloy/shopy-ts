import { IoIosMail } from 'react-icons/io';
import { useState } from 'react';
import './newsLetter.scss';

function NewsLetter() {
  const [value, setValue] = useState('');

  return (
    <div className="news-letter">
      <div className="news-letter__inner">
        <div className="news-letter__col1">
          <h2 className="news-letter__title">news letter</h2>
          <p className="news-letter__text">
            join us now to get all news and special offers
          </p>
        </div>
        <div className="news-letter__col2">
          <div className="news-letter__form">
            <div className="news-letter__svg-wrapper">
              <IoIosMail className="news-letter__svg" />
              <input
                className="news-letter__input"
                type="text"
                placeholder="type your email here"
                name="mail"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    setValue('');
                  }
                }}
              />
            </div>
            <button
              className="news-letter__button"
              onClick={() => setValue('')}
            >
              join us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsLetter;
