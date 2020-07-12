class LargeImage {
  constructor() {
    this._domElement = null;
  }

  _createImage() {
    const element = document.createElement("img");
    element.classList.add("zoomer__image");

    return element;
  }

  setImageURL(url) {
    this._url = url;

    const imgTag = this.domElement();
    imgTag.setAttribute("src", this._url);
  }

  domElement() {
    if (null == this._domElement) {
      this._domElement = this._createImage();
    }
    return this._domElement;
  }
}
