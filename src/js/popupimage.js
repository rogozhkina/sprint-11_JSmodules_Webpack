import { Popup } from "./popup.js";

export class PopupImage extends Popup {
  constructor(content, additionalClasses) {
    super("", content, additionalClasses);
  }

  _template() {
    const icon = require("../images/close.svg");
    return `
    <div class="zoomer">
        <div class="zoomer__content">
        <img  src="${icon}" alt="" class="zoomer__close" />
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
