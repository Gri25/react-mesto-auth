import React from "react";
import yesImg from "../../images/PopupYesImg.jpg";
import noImg from "../../images/PopupNoImg.jpg";

function InfoTooltip(props) {
  return (
    <>
      <div className={`popup ${props.isToOpen ? "popup__opened" : ""}`}>
        <div className="popup__container">
          <button
            type="button"
            className="popup__close"
            onClick={props.onClose}
          ></button>
          <img className="popup__image" src={yesImg} alt="Успешно" />
          <h2 className="popup__text">Вы успешно зарегистрировались!</h2>
        </div>
      </div>
      <div className={`popup ${props.isDontOpen ? "popup__opened" : ""}`}>
        <div className="popup__container">
          <button
            type="button"
            className="popup__close"
            onClick={props.onClose}
          ></button>
          <img className="popup__image" src={noImg} alt="Успешно" />
          <h2 className="popup__text">
            Что-то пошло не так! Попробуйте ещё раз.
          </h2>
        </div>
      </div>
    </>
  );
}

export default InfoTooltip;
