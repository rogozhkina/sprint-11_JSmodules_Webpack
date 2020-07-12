class FormValidator {
  constructor(domForm, submitButton, inputs) {
    this._domForm = domForm;
    this._submitButton = submitButton;
    this._inputs = inputs;
    this._names = {};
    this._inputs.forEach((input) => {
      const inputName = input.name();
      this._names[inputName] = input;
    });

    this._onInputChanged = this._onInputChanged.bind(this);
  }

  checkInputValidity(input) {
    const validator = input.validator();

    input.domErrorMessage().textContent = validator.errorMessage();
  }

  setSubmitButtonState() {
    let isValid = true;

    this._inputs.forEach((input) => {
      const is = input.isValid();
      if (!is) {
        isValid = false;
      }
    });

    this._submitButton.enable(isValid);
  }

  setEventListeners() {
    this._domForm.querySelectorAll(".popup__input").forEach((tagElement) => {
      tagElement.addEventListener("input", this._onInputChanged);
    });
  }

  _onInputChanged(event) {
    const tagInput = event.target;
    const inputName = tagInput.name;

    const input = this._names[inputName];
    input.onChange();

    this.checkInputValidity(input);
    this.setSubmitButtonState();
  }
}
