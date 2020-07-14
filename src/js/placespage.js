export class PlacesPage {
  constructor(
    api,
    domRootNode,
    domEditButton,
    domAddButton,
    cardList,
    userInfo,
    popupAdd,
    popupUser,
    userForm,
    formAdd,
    popupImage,
    largeImage
  ) {
    this._api = api;
    this._domEditButton = domEditButton;
    this._domAddButton = domAddButton;
    this._domRootNode = domRootNode;
    this._cardList = cardList;
    this._userInfo = userInfo;
    this._popupAdd = popupAdd;
    this._popupUser = popupUser;
    this._userForm = userForm;
    this._formAdd = formAdd;
    this._popupImage = popupImage;
    this._largeImage = largeImage;
    this._onClickEditUser = this._onClickEditUser.bind(this);
    this._onClickAddCard = this._onClickAddCard.bind(this);
    this._onClickLargeImage = this._onClickLargeImage.bind(this);
    this._onFormSubmitClicked = this._onFormSubmitClicked.bind(this);
    this._onAddSubmitClicked = this._onAddSubmitClicked.bind(this);
    this._domRootNode.appendChild(this._popupUser.domElement());
    this._domRootNode.appendChild(this._popupAdd.domElement());
    this._domRootNode.appendChild(this._popupImage.domElement());
    this._setupLogic();
  }

  _setupLogic() {
    this._domEditButton.addEventListener("click", this._onClickEditUser);
    this._domAddButton.addEventListener("click", this._onClickAddCard);
    this._cardList.subscribeLargeImageClick(this._onClickLargeImage);
    this._userForm.subscribeSubmit(this._onFormSubmitClicked);
    this._formAdd.subscribeSubmit(this._onAddSubmitClicked);
  }

  _onClickLargeImage(cardData) {
    this._largeImage.setImageURL(cardData.link);
    this._popupImage.open();
  }

  _onClickEditUser() {
    this._popupUser.open();
  }

  _onClickAddCard() {
    this._popupAdd.open();
  }

  _onFormSubmitClicked() {
    this._api.updateUserInfo(
      this._userInfo.name(),
      this._userInfo.job(),
      (data) => {
        // в случае success
        // сохраняем и отображаем по второму кругу с использованием информации
        // от сервера, хотя данные должны совпасть
        this._userInfo.setUserInfo(data.name, data.about);
        this._userInfo.updateUserInfo(); // отрисовка
        // закрытие больше не происходит по подписке popup
        this._popupUser.close();
      },
      () => {
        // в случае failed
        this._userInfo.undoUserInfo(); // возврат старых значений
        this._userInfo.updateUserInfo(); // отрисовка
        alert("Не удалось сохранить!");
        this._popupUser.reset();
      }
    );
  }

  _onAddSubmitClicked() {
    this._popupAdd.close();
  }

  render() {
    this._api.getUserInfo((userData) => {
      this._userInfo.setUserInfo(
        userData.name,
        userData.about,
        userData.avatar,
        userData._id
      );
      this._userInfo.updateUserInfo();
    });

    this._api.getInitialCards((cards) => {
      cards.forEach((card) => {
        if (card.owner._id != this._userInfo.id()) {
          return;
        }

        this._cardList.addCard({
          name: card.name,
          link: card.link,
        });
      });

      this._cardList.render();
    });
  }
}
