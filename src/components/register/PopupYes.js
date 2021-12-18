import React from "react";
import yesImg from "../../images/PopupYesImg.jpg";

function PopupYes(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup__opened" : ""}`}>
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
  );
}

export default PopupYes;
