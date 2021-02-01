export class InputValidator {
  constructor(min, max, errorMessageEmpty, errorMessageWrongLength) {
    this._min = min;
    this._max = max;
    this._errorMessageEmpty = errorMessageEmpty;
    this._errorMessageWrongLength = errorMessageWrongLength;
    this._isValid = false;
    this._lastLength = 0;
  }

  isValid() {
    return this._isValid;
  }

  reset() {
    this._isValid = false;
    this._lastLength = -1;
  }

  onValueChanged(str) {
    const length = str.length;
    this._lastLength = length;
    this._isValid = false;
    if (this._min > 0 && length < this._min) {
      return;
    }
    if (this._max > 0 && length > this._max) {
      return;
    }
    this._isValid = true;
  }

  errorMessage() {
    if (this._isValid || this._lastLength < 0) {
      return "";
    }
    if (this._lastLength === 0) {
      return this._errorMessageEmpty;
    }
    return this._errorMessageWrongLength;
  }
}
