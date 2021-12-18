import React from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../../images/Vector.svg";
import PopupYes from "./PopupYes";
import * as auth from "../auth.js";

class Register extends React.Component {
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
    if (this.state.password) {//если что сотри это условие!!!!!!
      const { password, email } = this.state;
      auth.register(password, email).then((res) => {
        if (res) {
          this.setState(
            {
              message: "",
            },
            () => {
              this.props.history.push("/sign-in");
            }
          );
        } else {
          this.setState({
            message: "Что-то пошло не так!",
          });
        }
      });
      // сюда добавим логику обработки формы регистрации
    }
  }
  render() {
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
          <form onSubmit={this.handleSubmit} className="first-page__form">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              className="first-page__input"
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Пароль"
              value={this.state.password}
              onChange={this.handleChange}
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
  }
}

export default withRouter(Register);

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
