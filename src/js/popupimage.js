class PopupImage extends Popup {
  constructor(content, additionalClasses) {
    super("", content, additionalClasses);
  }

  _template() {
    return `
    <div class="zoomer">
        <div class="zoomer__content">
        <img src="./images/close.svg" alt="" class="zoomer__close" />
        </div>
    </div>
  `;
  }
  _selectorClose() {
    return ".zoomer__close";
  }

  _selectorContent() {
    return ".zoomer__content";
  }

  _classIsOpened() {
    return "zoomer_is-opened";
  }
}
