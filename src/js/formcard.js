import { Form } from "./form.js";

export class FormCard extends Form {
  constructor(
    cardList,
    inputs,
    submitButton,
    formValidatorCreator,
    additionalClasses
  ) {
    super(inputs, submitButton, formValidatorCreator, additionalClasses);
    this._cardList = cardList;
  }

  _onSubmit() {
    const cardname = this._names["cardname"].value();
    const link = this._names["link"].value();

    this._cardList.addCard({
      name: cardname,
      link: link,
    });

    this._cardList.render();
    this.reset();
    this._informSubscribers();
  }
}
