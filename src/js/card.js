"use strict";

export class Card {
  constructor(cardData) {
    this._domElement = null;
    this._cardData = cardData;
    this._likeButton = null;
    this._largeImageSubscribers = [];
    this._removeSubscribers = [];
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);
    this._onImageClick = this._onImageClick.bind(this);
  }

  _createCard() {
    const templateString = `
    <div class="place-card">
    <div class="place-card__image">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name"></h3>
      <button class="place-card__like-icon"></button>
    </div>
    </div>`;
    const template = document.createElement("div");
    template.insertAdjacentHTML("beforeend", templateString.trim());

    const placeCard = template.firstElementChild;
    placeCard.querySelector(
      ".place-card__name"
    ).textContent = this._cardData.name;

    const cardImage = placeCard.querySelector(".place-card__image");
    cardImage.style.backgroundImage = `url(${this._cardData.link})`;

    cardImage.addEventListener("click", this._onImageClick);

    /** REVIEW: Можно лучше:
     *
     * Вынести добавление обработчиков в отдельный метод, например addEventListeners, реализация будет выглядеть примерно так:
     *
     * this.element.querySelector('.place-card__like-icon').addEventListener('click', this.like);
     * this.element.querySelector('...').addEventListener(...);
     * }
     *
     * И вызывать этот метод перед возвращением элемента placeCard в методе _createCard
     */
    this._likeButton = placeCard.querySelector(".place-card__like-icon");
    this._likeButton.addEventListener("click", this.like);

    this._deleteButton = placeCard.querySelector(".place-card__delete-icon");
    this._deleteButton.addEventListener("click", this.remove);

    return placeCard;
  }

  domElement() {
    if (null == this._domElement) {
      this._domElement = this._createCard();
    }
    return this._domElement;
  }

  _onImageClick(event) {
    event.preventDefault();

    this._largeImageSubscribers.forEach((subscrieber) => {
      subscrieber(this._cardData);
    });
  }

  like() {
    this._likeButton.classList.toggle("place-card__like-icon_liked");
  }

  remove(event) {
    event.stopImmediatePropagation();
    this.removeListeners();
    this._domElement.remove();

    this._removeSubscribers.forEach((subscrieber) => {
      subscrieber(this);
    });
  }

  removeListeners() {
    this._deleteButton.removeEventListener("click", this.remove);
    this._likeButton.removeEventListener("click", this.like);

    const cardImage = this._domElement.querySelector(".place-card__image");
    cardImage.style.backgroundImage = `url(${this._cardData.link})`;
    cardImage.removeEventListener("click", this._onImageClick);
  }

  subscribeLargeImageClick(callback) {
    if (typeof callback !== "function") {
      return;
    }

    this._largeImageSubscribers.push(callback);
  }

  subscribeRemove(callback) {
    if (typeof callback !== "function") {
      return;
    }

    this._removeSubscribers.push(callback);
  }
}
