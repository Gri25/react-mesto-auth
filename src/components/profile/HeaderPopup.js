import React from "react";
import { useHistory } from "react-router-dom";

//не могу реализовать плавное закрытие поппапа в хедере(прописал анимацию для класа на false  в тернарном операторе
//но она почему то не работает)

function HeaderPopup(props) {
  return (
    <>
      <div
        className={`header-popup ${
          props.isOpen
            ? "header-popup__opened"
            : "header-popup__animation-closed"
        }`}
      >
        <button
          type="button"
          className="header-popup__closed"
          onClick={props.onClose}
        ></button>
        <p className="header-popup__mail">{props.userData.email}</p>
        <button onClick={props.onLogout} className="header-popup__out">
          Выйти
        </button>
      </div>
    </>
  );
}

export default HeaderPopup;
