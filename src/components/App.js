import React, { useEffect } from "react";
import Profile from "./profile/Profile";
import Register from "./register/Register ";
import Login from "./login/Login ";
//import PageNotFound from "./PageNotFound";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
//import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "./auth.js";

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  // console.log(userData);

  const history = useHistory();

  useEffect(() => {
    if (loggedIn === true) {
      history.push("/profile");
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const token = localStorage.getItem("token");
    if (token) {
      // проверим токен
      auth.getContent(token).then((data) => {
        if (data) {
          //  console.log(data.data);
          // здесь можем получить данные пользователя!
          const userData = {
            email: data.data.email,
            //          password: data.data._id,
          };
          localStorage.setItem("token", token);
          setUserData(userData);
          setLoggedIn(true);
        }
      });
    }
  };

  const handleLogin = ({ email, password }) => {
    console.log(email, password);
    auth
      .authorize({
        email,
        password,
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
        }
        tokenCheck();
      })
      .catch((error) => console.error(error));
  };

  const [isToRegisterPopupOpen, setIsToRegisterPopupOpen] =
    React.useState(false);

  const [isDontRegisterPopupOpen, setIsDontRegisterPopupOpen] =
    React.useState(false);

  function handleToRegisterPopupOpen() {
    setIsToRegisterPopupOpen(true);
  }

  function handleDontRegisterPopupOpen() {
    setIsDontRegisterPopupOpen(true);
  }

  //вот тут функция закрытия попапов
  function closeAllRegistrePopups() {
    if (isToRegisterPopupOpen) {
      history.push("/sign-in");
    }
    setIsToRegisterPopupOpen(false);
    setIsDontRegisterPopupOpen(false);
  }

  const handleRegister = ({ email, password }) => {
    //  console.log(email, password);
    auth
      .register({ email, password })
      .then((data) => {
        if (data) {
          //  const { email } = data;
          setUserData({
            email,
            password,
          });
          //  console.log(data);

          handleToRegisterPopupOpen();
        }
      })
      .catch((error) => {
        console.error(error);
        handleDontRegisterPopupOpen();
      });
    // тут видимо что-то нужно написать для попапа
  };

  const handleLogout = () => {
    //  console.log('Logout');
    localStorage.removeItem("token");
    setUserData({
      email: "",
      password: "",
    });
    setLoggedIn(false);
  };

  return (
    <Switch>
      
      <ProtectedRoute
        path="/profile"
        loggedIn={loggedIn}
        userData={userData}
        component={Profile}
        onLogout={handleLogout}
      />
      <Route path="/sign-up">
        <Register
          onRegister={handleRegister}
          onClose={closeAllRegistrePopups}
          isToOpen={isToRegisterPopupOpen}
          isDontOpen={isDontRegisterPopupOpen}
        />
      </Route>
      <Route path="/sign-in">
        <Login onLogin={handleLogin} tokenCheck={tokenCheck} />
      </Route>
      <Route exact path="/">
        {loggedIn ? <Redirect to="/profile" /> : <Redirect to="/sign-in" />}
      </Route>
    </Switch>
  );
};

export default App;
