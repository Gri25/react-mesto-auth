import logo from "../../images/Vector.svg";
import { Link } from "react-router-dom";

function Header(props) {
  const onHeaderPopup = () => {
    props.onHeaderPopup();
  };
  function signOut() {
    localStorage.removeItem("jwt");
  }

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Место-Россия" />
      <button
        type="button"
        className={`header__bar-open ${
          props.isOpen ? "header__bar-open_type_none" : ""
        }`}
        onClick={onHeaderPopup}
      ></button>
      <div className="header__bar">
        <p className="header__mail">EMAIL</p>
        <Link onClick={signOut} to="/sign-in" className="header__out">
          Выйти
        </Link>
      </div>
    </header>
  );
}

export default Header;

/*
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Место-Россия" />
      <button type="button" className="header__bar-open"></button>
      <div className="header__bar">
      <button type="button" className="header__bar-closed"></button>   
        <p className="header__mail">Емsdfsdfsdfsfейл</p>
        <Link to="/sign-in" className="header__out">
          Выйти
        </Link>
      </div>

    </header>
    */
