import React from "react";
import Profile from "./profile/Profile";
import Register from "./register/Register ";
import Login from "./login/Login ";
//import PageNotFound from "./PageNotFound";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
//import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "./auth.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.tokenCheck = this.tokenCheck.bind(this);
  }

  componentDidMount() {
    this.tokenCheck();
    // проверить токен пользователя
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      loggedIn: true,
    });
  }

  tokenCheck() {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // проверим токен
      auth.getContent(jwt).then((res) => {
        if (res) {
                          // здесь можем получить данные пользователя!
        const userData = {
          password: res.password,
          email: res.email
        }
          // авторизуем пользователя
          this.setState(
            {
              loggedIn: true,
              userData // поместим их в стейт внутри App.js
            },
            () => {
              // обернём App.js в withRouter
              // так, что теперь есть доступ к этому методу
              this.props.history.push("/profile");
            }
          );
        }
      });
    }
  }

  render() {
    return (
      <Switch>
        <ProtectedRoute
          path="/profile"
          loggedIn={this.state.loggedIn}
          userData={this.state.userData}
          component={Profile}
        />
        <Route path="/sign-up">
          <Register />
        </Route>
        <Route path="/sign-in">
          <Login handleLogin={this.handleLogin} />
        </Route>
        <Route exact path="/">
          {this.state.loggedIn ? (
            <Redirect to="/profile" />
          ) : (
            <Redirect to="/sign-in" />
          )}
        </Route>
      </Switch>
    );
  }
}

export default withRouter(App);

/* <Route path="*">
          <PageNotFound />
        </Route>



      function App() {
  return (
    <Switch>
      <Route path="/sign-up">
        <Register />
      </Route>
      <Route path="/sign-in">
        <Login />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
}
      */
