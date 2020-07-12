class PlacesPage {
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
    this._popupImage = popupImage;
    this._largeImage = largeImage;
    this._onClickEditUser = this._onClickEditUser.bind(this);
    this._onClickAddCard = this._onClickAddCard.bind(this);
    this._onClickLargeImage = this._onClickLargeImage.bind(this);
    this._onFormSubmitClicked = this._onFormSubmitClicked.bind(this);
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
    /*REVIEW. + Надо исправить. Методу this._api.updateUserInfo как параметры надо передавать значения полей формы, которые только что ввёл
    пользователь, а не что-либо другое. Так как, если Ваши функции userInfo.name() и userInfo.job() возвращают значения из формы профиля, то до
    прихода ответа сервера по запросу из api.updateUserInfo, там должны быть ещё старые значения, так как до прихода ответа сохранять то, что ввёл
    пользователь в свойствах класса нельзя, потому что в ответе сервера может быть сообщение о неуспешности выполнения запроса, тогда ни свойства
    класса, ни информация на странице о пользователе меняться не должны, чтобы сохранить идентичность информации на сервере, на странице и в свойствах
    класса.  */

    /*REVIEW. + Надо исправить. При запросе из api.updateUserInfo Вы почему-то никак не обрабатываете ответ от сервера. А сервер присылает в ответ
    объект с информацией о пользователе, которую оон только что сохранил на своей стороне, прочитайте об этом объекте в пункте описания задания
    '3. Редактирование профиля'.
    И именно свойства объекта name и about из этого ответа должны занестись в элементы страницы, когда этот ответ придёт,
    а не значения полей ввода из формы профиля. После прихода ответа и заполнения элементов страницы информацией, форма профиля должна закрыться
    (не раньше). Поэтому Вы и в параметрах api.updateUserInfo должны задавать свой коллбэк success, в котором должны, вызвав его в методе then,
    произвести следующие действия:
    1. Сохранить информацию, которую вернул сервер в свойствах класса UserInfo (имя и профессию профиля).
    2. Занести эту же информацию в DOM-элементы страницы, демонстрирующие имя и профессию профиля (в элемеент аватара заносить ничего не надо).
    3. Закрыть форму профиля.
    */

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
