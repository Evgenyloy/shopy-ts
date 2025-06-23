import { IoIosMail } from "react-icons/io";
import { useState } from "react";
import "./newsLetter.scss";

function NewsLetter() {
  const [value, setValue] = useState("");
  const [mail, setMail] = useState(false);

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
                disabled={mail}
                className="news-letter__input"
                type="email"
                placeholder={
                  mail
                    ? "we sent a message to your email"
                    : "type your email here"
                }
                name="mail"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    setValue("");
                    setMail(true);
                  }
                }}
              />
            </div>
            <button
              className="news-letter__button"
              onClick={() => {
                if (!value) return;
                setValue("");
                setMail(true);
              }}
              disabled={mail ? true : false}
            >
              {mail ? "joined" : "join us"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsLetter;
