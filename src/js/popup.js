import "../images/close.svg";

export class Popup {
  constructor(title, content, additionalClasses) {
    this._domElement = null;
    this._closeButton = null;

    this._content = content;
    this._title = title;
    this._additionalClasses = additionalClasses;
    if (typeof this._additionalClasses !== "object") {
      this._additionalClasses = [];
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  _template() {
    return `
    <div class="popup">
        <div class="popup__content">
        <img  src="../images/close.svg" alt="" class="popup__close" />
        </div>
    </div>
  `;
  }

  _selectorClose() {
    return ".popup__close";
  }

  _selectorContent() {
    return ".popup__content";
  }

  _classIsOpened() {
    return "popup_is-opened";
  }

  _createPopup() {
    const templateString = this._template();
    const template = document.createElement("div");
    template.insertAdjacentHTML("beforeend", templateString.trim());

    const element = template.firstElementChild;

    this._additionalClasses.forEach((className) => {
      if (className.length > 0) {
        element.classList.add(className);
      }
    });

    this._closeButton = element.querySelector(this._selectorClose());
    this._closeButton.addEventListener("click", this.close);

    const popupContent = element.querySelector(this._selectorContent());

    if (this._title.length > 0) {
      const tagTitle = document.createElement("h3");
      tagTitle.classList.add("popup__title");
      tagTitle.textContent = this._title;
      popupContent.appendChild(tagTitle);
    }

    if (typeof this._content !== "undefined") {
      const domContent = this._content.domElement();
      popupContent.appendChild(domContent);
    }

    //    if (typeof this._content.subscribeSubmit === "function") {
    //      this._content.subscribeSubmit(this.close);
    //    }

    return element;
  }

  domElement() {
    if (null == this._domElement) {
      this._domElement = this._createPopup();
    }
    return this._domElement;
  }

  open() {
    this._domElement.classList.add(this._classIsOpened());
    if (
      typeof this._content !== "undefined" &&
      typeof this._content.reset !== "undefined"
    ) {
      this._content.reset();
    }
  }

  close() {
    this._domElement.classList.remove(this._classIsOpened());
  }
}
