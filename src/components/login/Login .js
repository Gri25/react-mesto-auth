import React from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../../images/Vector.svg";
import * as auth from "../auth.js";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      return;
    }
  auth.authorize(this.state.email, this.state.password)
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
  }
  render() {
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
          <form onSubmit={this.handleSubmit} className="first-page__form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="first-page__input"
              required
              minLength={2}
              maxLength={40}
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
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
              value={this.state.password}
              onChange={this.handleChange}
            />
            <span className="popup__input-error"></span>
            <button className="first-page__button" type="submit">
              Войти
            </button>
          </form>
        </main>
      </>
    );
  }
}

export default withRouter(Login);

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
