class FormUser extends Form {
  constructor(
    userInfo,
    inputs,
    submitButton,
    formValidatorCreator,
    additionalClasses
  ) {
    super(inputs, submitButton, formValidatorCreator, additionalClasses);
    this._userInfo = userInfo;
  }

  reset() {
    super.reset();
    this._submit.enable(true);
    this._submit.rename("Сохранить");
    const name = this._userInfo.name();
    const job = this._userInfo.job();
    this._names["username"].setValue(name);
    this._names["job"].setValue(job);
  }

  _setWaitingAnswer() {
    this._submit.rename("Сохранение...");
    this._submit.enable(false);
  }

  _onSubmit() {
    this._setWaitingAnswer();
    const name = this._names["username"].value();
    const job = this._names["job"].value();
    this._userInfo.setUserInfo(name, job);
    this._userInfo.updateUserInfo();
    this._informSubscribers();
  }
}
