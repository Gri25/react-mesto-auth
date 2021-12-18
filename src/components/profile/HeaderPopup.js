import React from "react";
import { Link } from "react-router-dom";

//не могу реализовать плавное закрытие поппапа в хедере(прописал анимацию для класа на false  в тернарном операторе
//но она почему то не работает)

function HeaderPopup(props) {
  function signOut() {
    localStorage.removeItem("jwt");
  }

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
        <p className="header-popup__mail">ЭТОМОЙМЕЙЛ</p>
        <Link onClick={signOut} to="/sign-in" className="header-popup__out">
          Выйти
        </Link>
      </div>
    </>
  );
}

export default HeaderPopup;
