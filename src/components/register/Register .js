import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Vector.svg";
import PopupYes from "./PopupYes";
import * as auth from "../auth.js";

const Register = ({ onRegister }) => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  if (data.password) {
    //если что сотри это условие!!!!!!
    const { email, password } = data;
    onRegister({ email, password });
    /*
    auth.register(password, email).then((res) => {
      if (res) {
        setState(
          {
            message: "",
          },
          () => {
            props.history.push("/sign-in");
          }
        );
      } else {
        setState({
          message: "Что-то пошло не так!",
        });
      }
    });
    */
    // сюда добавим логику обработки формы регистрации
    //  }
  };

  return (
    <>
      <header className="header">
        <img src={logo} className="header__logo" alt="Место-Россия" />
        <Link to="/sign-in" className="header__register">
          Войти
        </Link>
      </header>
      <main className="first-page">
        <h1 className="first-page__text">Регистрация</h1>
        <form onSubmit={handleSubmit} className="first-page__form">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            className="first-page__input"
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={data.password}
            onChange={handleChange}
            className="first-page__input"
          />

          <button type="submit" className="first-page__button">
            Зарегистрироваться
          </button>
        </form>
        <Link to="/sign-in" className="first-page__link">
          Уже зарегистрированы? Войти
        </Link>
      </main>
      <PopupYes />
    </>
  );
};

export default Register;

/*
function Register() {
  return (
    <>
      <header className="header">
        <img src={logo} className="header__logo" alt="Место-Россия" />
        <Link to="/sign-in" className="header__register">
          Войти
        </Link>
      </header>

      <main className="first-page">
        <h1 className="first-page__text">Регистрация</h1>
        <form className="first-page__form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="first-page__input"
          required
          minLength={2}
          maxLength={40}
        />
        <span className="popup__input-error"></span>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="first-page__input"
          required
          minLength={2}
          maxLength={200}
        />
        <span className="popup__input-error"></span>
        </form>
        <button className="first-page__button">Зарегистрироваться</button>
        <Link to="/sign-in" className="first-page__link">
          Уже зарегистрированы? Войти
        </Link>
      </main>
      <PopupYes/>
    </>
    Выше опиши попапы!<PopupYes/>
  );
}
*/
