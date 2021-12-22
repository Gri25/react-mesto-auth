import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Vector.svg";
import * as auth from "../auth.js";

const Login = ({ onLogin }) => {
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
    if (!data.email || !data.password) {
      return;
    }
    const { email, password } = data;
    onLogin({ email, password });
    /*
  auth.authorize(data.email, data.password)
    .then((data) => {
      if (data.jwt){
        this.setState({email: '', password: ''} ,() => {
            this.props.handleLogin();
            this.props.history.push('/profile');
        })
      }  
    })
    .catch(err => console.log(err));
    // здесь авторизуем пользователя
    // далее проверяем токен
    // наконец, перенаправляем пользователя на страницу `/profile`
    */
  };

  return (
    <>
      <header className="header">
        <img src={logo} className="header__logo" alt="Место-Россия" />
        <Link to="/sign-up" className="header__register">
          Регистрация
        </Link>
      </header>

      <main className="first-page">
        <h1 className="first-page__text">Вход</h1>
        <form onSubmit={handleSubmit} className="first-page__form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="first-page__input"
            required
            minLength={2}
            maxLength={40}
            id="email"
            value={data.email}
            onChange={handleChange}
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
            id="password"
            value={data.password}
            onChange={handleChange}
          />
          <span className="popup__input-error"></span>
          <button className="first-page__button" type="submit">
            Войти
          </button>
        </form>
      </main>
    </>
  );
};

export default Login;

/*
function Login() {
  return (
    <>
      <header className="header">
        <img src={logo} className="header__logo" alt="Место-Россия" />
        <Link to="/sign-up" className="header__register">
          Регистрация
        </Link>
      </header>

      <main className="first-page">
        <h1 className="first-page__text">Вход</h1>
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
          <button className="first-page__button">Войти</button>
        </form>
      </main>
    </>
  );
}
*/
