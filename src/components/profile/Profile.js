import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import DeletePopup from "./DeletePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../../utils/Api";
import HeaderPopup from "./HeaderPopup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
//не могу понять как реализовать плавное закрытие хедер попапа на 320px, додумался только до плавного открытия через кейфрейм
// если есть идеи, подскажите пожалуйста 
function Profile() {
  const [currentUser, setcurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getPersonalInfo(), api.getCard()])
      .then(([user, data]) => {
        setcurrentUser(user);
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    link: "",
    name: "",
  });

  const [ishandleHeaderPopupClick, setIshandleHeaderPopupClick] =
    React.useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleHeaderPopupClick() {
    setIshandleHeaderPopupClick(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  const handleClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };

  const [cardForDelete, setCardForDelete] = React.useState({});
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);

  function handleDeleteClick(card) {
    setCardForDelete(card);
    setIsDeletePopupOpen(true);
  }

  function handleCardDelete(element) {
    // Отменяем стандартное поведение
    element.preventDefault();
    // Отправляем запрос в API
    api
      .removeCard(cardForDelete._id)
      .then(() => {
        // Методом фильтр мы создаем новый массив на основе нашего только с некоторыми условиями
        setCards(cards.filter((c) => c._id !== cardForDelete._id));
        closeAllPopups();
      })
      //выведем ошибку в консоль
      .catch((err) => {
        console.error(err);
      });
  }

  const handleUpdateUser = (data) => {
    api
      .changeUserInfo(data)
      .then((res) => {
        setcurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .editAvatarUser(data.avatarLink)
      .then((res) => {
        setcurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddPlaceSubmit = (newCard) => {
    api
      .addNewCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIshandleHeaderPopupClick(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <HeaderPopup isOpen={ishandleHeaderPopupClick} onClose={closeAllPopups} />
      <Header
      onHeaderPopup={handleHeaderPopupClick}
      isOpen={ishandleHeaderPopupClick}
      />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleClick}
        onHandleDeleteClick={handleDeleteClick}
        cards={cards}
        onLike={handleCardLike}
      />
      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <DeletePopup
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
      />

      <ImagePopup
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
        card={selectedCard}
      />
    </CurrentUserContext.Provider>
  );
}

export default Profile;
