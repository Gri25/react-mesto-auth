import logo from "../../images/Vector.svg";
// имейл отрисовывается только после обновления страницы, подскажите пожалуйстаа что не так

function Header(props) {
  const onHeaderPopup = () => {
    props.onHeaderPopup();
  };

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
        <p className="header__mail">{props.userData.email}</p>
        <button onClick={props.onLogout} className="header__out">
          Выйти
        </button>
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
