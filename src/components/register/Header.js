import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Vector.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Место-Россия" />
      <Link to="/sign-in" className="header__register">
        Войти
      </Link>
    </header>
  );
}

export default Header;
