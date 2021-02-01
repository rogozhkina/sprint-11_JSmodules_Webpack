export class TextInput {
  constructor(placeholder, name, type, validator) {
    this._domInput = null;
    this._domErrorMessage = null;
    this._placeholder = placeholder;
    this._name = name;
    this.type = type;
    this._validator = validator;
    this._subscribers = [];
  }

  isValid() {
    return this._validator.isValid();
  }

  name() {
    return this._name;
  }

  _createInput() {
    const templateString = `<input
    required
    type="text"
    class="popup__input popup__input_type_name"
    />`;
    const template = document.createElement("div");
    template.insertAdjacentHTML("beforeend", templateString.trim());
    const element = template.firstElementChild;

    element.setAttribute("placeholder", this._placeholder);
    element.setAttribute("name", this._name);
    element.setAttribute("type", this._type);

    return element;
  }

  setValue(text, triggerChecks) {
    this.domElements();
    this._domInput.value = text;

    if (typeof triggerChecks === "undefined") {
      triggerChecks = true;
    }
    if (triggerChecks) {
      this._validator.onValueChanged(text);
    }
  }

  reset() {
    this._validator.reset();
    this.setValue("");
    this._domErrorMessage.textContent = "";
  }

  value() {
    return this._domInput.value;
  }

  _createErrorMessage() {
    const templateString = `<span class="popup__error-message"></span>`;
    const template = document.createElement("div");
    template.insertAdjacentHTML("beforeend", templateString.trim());
    const element = template.firstElementChild;
    element.setAttribute("id", this._name);
    return element;
  }

  onChange() {
    const value = this._domInput.value;
    this._validator.onValueChanged(value);

    this._subscribers.forEach((subscrieber) => {
      if (typeof subscrieber === "function") {
        subscrieber();
      }
    });
  }

  validator() {
    return this._validator;
  }

  domInput() {
    if (null == this._domInput) {
      this._domInput = this._createInput();
    }
    return this._domInput;
  }

  domErrorMessage() {
    if (null == this._domErrorMessage) {
      this._domErrorMessage = this._createErrorMessage();
    }
    return this._domErrorMessage;
  }

  domElements() {
    const result = [];
    result.push(this.domInput());
    result.push(this.domErrorMessage());
    return result;
  }

  subscribe(callback) {
    this._subscribers.push(callback);
  }
}
