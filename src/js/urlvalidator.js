import { InputValidator } from "./inputvalidator.js";

export class URLValidator extends InputValidator {
  constructor(errorMessageEmpty, errMessageWrongLink) {
    super(0, 0, errorMessageEmpty, "");
    this._errMessageWrongLink = errMessageWrongLink;
  }

  onValueChanged(string) {
    this._lastLength = string.length;

    const link = document.createElement("a");
    link.setAttribute("href", string);

    this._isValid = false;
    if (!link.protocol || !link.hostname) {
      return;
    }
    const spacePosition = link.hostname.indexOf("%20");
    if (spacePosition >= 0) {
      return;
    }

    const position = link.hostname.lastIndexOf(".");
    if (position < 1) {
      return;
    }
    const domain = link.hostname.substring(position + 1);
    if (domain.length < 2) {
      return;
    }
    this._isValid = true;
  }

  errorMessage() {
    if (this._isValid || this._lastLength < 0) {
      return "";
    }

    if (!this._isValid && this._lastLength === 0) {
      return this._errorMessageEmpty;
    }

    return this._errMessageWrongLink;
  }
}
