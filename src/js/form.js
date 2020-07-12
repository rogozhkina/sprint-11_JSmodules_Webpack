class Form {
  constructor(inputs, submitButton, formValidatorCreator, additionalClasses) {
    this._domElement = null;
    this._inputs = inputs;
    this._formValidatorCreator = formValidatorCreator;
    this._validator = null;

    if (typeof additionalClasses !== "object") {
      additionalClasses = [];
    }

    this._additionalClasses = additionalClasses;
    this._names = {};
    this._inputs.forEach((input) => {
      const inputName = input.name();
      this._names[inputName] = input;
    });

    this._submit = submitButton;
    this._subscribers = [];
    this._onFormChanged = this._onFormChanged.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  domElement() {
    if (null == this._domElement) {
      this._domElement = this._createForm();
    }

    return this._domElement;
  }

  _createForm() {
    const tagElement = document.createElement("form");

    this._additionalClasses.forEach((className) => {
      tagElement.classList.add(className);
    });

    this._inputs.forEach((input) => {
      input.domElements().forEach((tag) => {
        tagElement.appendChild(tag);
      });
      input.subscribe(this._onFormChanged);
    });

    tagElement.appendChild(this._submit.domElement());
    this._submit.subscribe(this._onSubmit);

    this._validator = this._formValidatorCreator(
      tagElement,
      this._submit,
      this._inputs
    );
    this._validator.setEventListeners();
    return tagElement;
  }

  _informSubscribers() {
    this._subscribers.forEach((subscrieber) => {
      subscrieber();
    });
  }

  _onSubmit() {
    this._informSubscribers();
  }

  _onFormChanged() {}

  reset() {
    this._submit.enable(false);
    this._inputs.forEach((input) => {
      input.reset();
    });
  }

  subscribeSubmit(callback) {
    if (typeof callback !== "function") {
      return;
    }
    this._subscribers.push(callback);
  }
}
