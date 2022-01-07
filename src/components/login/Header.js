import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Vector.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Место-Россия" />
      <Link to="/sign-up" className="header__register">
        Регистрация
      </Link>
    </header>
  );
}

export default Header;
