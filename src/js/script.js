import "../pages/index.css";
// import "../style.css";

import { Api } from "./api.js";
import { Button } from "./button.js";
import { Card } from "./card.js";
import { CardList } from "./cardlist.js";
// import { Form } from "./form.js";
import { FormCard } from "./formcard.js";
import { FormUser } from "./formuser.js";
import { FormValidator } from "./formvalidator.js";
import { InputValidator } from "./inputvalidator.js";
import { LargeImage } from "./largeimage.js";
import { PlacesPage } from "./placespage.js";
import { Popup } from "./popup.js";
import { TextInput } from "./textinput.js";
import { URLValidator } from "./urlvalidator.js";
import { UserInfo } from "./userinfo.js";

(function () {
  const domRootNode = document.querySelector(".root");
  const domEditButton = document.querySelector(".user-info__button_edit");
  const domAddButton = document.querySelector(".user-info__button_add");
  const domCardListContainer = document.querySelector(".places-list");

  const errorEmptyField = "Это обязательное поле";
  const errorWrongLength = "Должно быть от 2 до 30 символов";
  const errorWrongLink = "Это не ссылка";

  const api = new Api({
    baseUrl: "https://praktikum.tk/cohort11",
    headers: {
      authorization: "098deaea-e99e-492d-906f-622aa2508f6d",
      "Content-Type": "application/json",
    },
  });

  const userInfo = new UserInfo(
    ".user-info__name",
    ".user-info__job",
    ".user-info__photo"
  );

  const cardList = new CardList(domCardListContainer, (cardData) => {
    return (newCard = new Card(cardData));
  });

  const formAdd = new FormCard(
    cardList,
    [
      new TextInput(
        "Название",
        "cardname",
        "text",
        new InputValidator(2, 30, errorEmptyField, errorWrongLength)
      ),
      new TextInput(
        "Ссылка на картинку",
        "link",
        "text",
        new URLValidator(errorEmptyField, errorWrongLink)
      ),
    ],
    new Button("+", ["popup__button"], "popup__button_disabled"),
    (tagElement, submit, inputs) => {
      return new FormValidator(tagElement, submit, inputs);
    },
    ["popup__form"]
  );
  const popupAdd = new Popup("Новое место", formAdd);

  const formEdit = new FormUser(
    userInfo,
    [
      new TextInput(
        "Имя",
        "username",
        "text",
        new InputValidator(2, 30, errorEmptyField, errorWrongLength)
      ),
      new TextInput(
        "О себе",
        "job",
        "text",
        new InputValidator(2, 30, errorEmptyField, errorWrongLength)
      ),
    ],
    new Button(
      "Сохранить",
      ["popup__button", "popup__button_edit"],
      "popup__button_disabled"
    ),
    (tagElement, submit, inputs) => {
      return new FormValidator(tagElement, submit, inputs);
    },
    ["popup__form"]
  );
  const popupUser = new Popup("Редактировать профиль", formEdit);

  const largeImage = new LargeImage();
  const popupImage = new PopupImage(largeImage);

  const page = new PlacesPage(
    api,
    domRootNode,
    domEditButton,
    domAddButton,
    cardList,
    userInfo,
    popupAdd,
    popupUser,
    formEdit,
    popupImage,
    largeImage
  );

  page.render();
})();
