export class CardList {
  constructor(domContainer, cardCreator) {
    this.container = domContainer;
    this._cardCreator = cardCreator;
    this._cardList = [];
    this._largeImageSubscribers = [];
    this._onImageClick = this._onImageClick.bind(this);
    this._onImageRemoved = this._onImageRemoved.bind(this);
  }

  addCard(cardData) {
    const newCard = this._cardCreator(cardData);
    newCard.subscribeLargeImageClick(this._onImageClick);
    newCard.subscribeRemove(this._onImageRemoved);
    this._cardList.push(newCard);
  }

  _onImageClick(cardData) {
    this._largeImageSubscribers.forEach((sub) => {
      sub(cardData);
    });
  }

  _onImageRemoved(card) {
    const newList = [];

    this._cardList.forEach((object) => {
      if (card === object) {
        return;
      }

      newList.push(object);
    });

    this._cardList = newList;
  }

  render() {
    this.container.textContent = "";
    this._cardList.forEach((card) => {
      const cards = card.domElement();
      this.container.appendChild(cards);
    });
  }

  subscribeLargeImageClick(callback) {
    if (typeof callback !== "function") {
      return;
    }

    this._largeImageSubscribers.push(callback);
  }
}
