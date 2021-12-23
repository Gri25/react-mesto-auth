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

  const history = useHistory()

  useEffect(() => {
    if (loggedIn === true) {
      history.push('/profile')
    }
  }, [loggedIn])

  useEffect(() => {
    tokenCheck()
  }, [])

  const tokenCheck = () => {
    
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const token = localStorage.getItem("token");
    if (token) {
      // проверим токен
      auth.getContent(token).then((data) => {
        if (data) {
          // здесь можем получить данные пользователя!
          const userData = {
            email: data.email,
            password: data.password,
          };
          localStorage.setItem("token", token)
          setUserData(userData)
          setLoggedIn(true)
        }
      });
    } 
  };

  const handleLogin = ({ email, password }) => {
    console.log(email, password);
    // e.preventDefault(); если будешь писать то дбавь (e) как аргумент
    auth.authorize({
      email,
      password
    })
    .then(data => console.log(data))
  //  .then(token => {
    //  if (token) {
     //  setLoggedIn(true);не понятно поему не меняется
   //   }
   // })
    .catch(error => console.error(error))
  };

  const handleRegister = ({ email, password }) => {
    console.log(email, password);
    auth
      .register({ email, password })
      .then((res) => console.log(res))
      
      .then((data) => {
        if (data) {
          const { email, password } = data;
        //  localStorage.setItem("token", token);
          setUserData({
            email,
            password,
          });
         // setLoggedIn(true);тут вроде бы как это не нужно писать
        }
      }) 
      
      .catch((error) => console.error(error));
  };

  return (
    <Switch>
      <ProtectedRoute
        path="/profile"
        loggedIn={loggedIn}
        userData={userData}
        component={Profile}
      />
      <Route path="/sign-up">
        <Register onRegister={handleRegister} />
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
