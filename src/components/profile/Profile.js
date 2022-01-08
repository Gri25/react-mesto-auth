import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import BurgerMenu from "./BurgerMenu";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

  function openBurgerMenu() {
    setIsBurgerMenuOpen(true);
  }

  function closeBurgerMenu() {
    setIsBurgerMenuOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <BurgerMenu
        isOpen={isBurgerMenuOpen}
        onClose={closeBurgerMenu}
        onLogout={props.onLogout}
        userData={props.userData}
      />
      <Header
        onHeaderPopup={openBurgerMenu}
        isOpen={isBurgerMenuOpen}
        onLogout={props.onLogout}
        userData={props.userData}
      />
      <Main
        onEditProfile={props.onEditProfile}
        onAddPlace={props.onAddPlace}
        onEditAvatar={props.onEditAvatar}
        onCardClick={props.onCardClick}
        onHandleDeleteClick={props.onHandleDeleteClick}
        cards={props.cards}
        onLike={props.onLike}
      />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default Profile;
