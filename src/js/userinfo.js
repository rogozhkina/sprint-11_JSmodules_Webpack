class UserInfo {
  constructor(selectorName, selectorJob, selectorAvatar) {
    this._domName = document.querySelector(selectorName);
    this._domJob = document.querySelector(selectorJob);
    this._domAvatar = document.querySelector(selectorAvatar);

    this._id = "";

    this._name = "";
    this._job = "";
    this._avatar = "";

    // для возврата по undo
    this._prevName = "";
    this._prevJob = "";
    this._prevAvatar = "";
  }

  // Рисует содержимое на странице
  updateUserInfo() {
    this._domName.textContent = this._name;
    this._domJob.textContent = this._job;
    this._domAvatar.style.backgroundImage = `url(${this._avatar})`;
  }

  name() {
    return this._name;
  }

  job() {
    return this._job;
  }

  avatar() {
    return this._avatar;
  }

  id() {
    return this._id;
  }

  // Сохраняет новые значения
  setUserInfo(name, job, avatar, id) {
    this._prevAvatar = this._avatar;
    this._prevName = this._name;
    this._prevJob = this._job;

    this._name = name;
    this._job = job;

    if (typeof avatar !== "undefined") {
      this._avatar = avatar;
    }
    if (typeof id !== "undefined") {
      this._id = id;
    }
  }

  // Возвращает предыдущие значения
  // на случай, если что-то пошло не так.
  undoUserInfo() {
    this._avatar = this._prevAvatar;
    this._name = this._prevName;
    this._job = this._prevJob;
  }
}
