class Api {
  constructor(options) {
    this._options = options;
  }

  getUserInfo(success) {
    const url = this._options.baseUrl + "/users/me";

    fetch(url, {
      headers: this._options.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        if (typeof success === "function") {
          success(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateUserInfo(name, job, fSuccess, fFailed) {
    const url = this._options.baseUrl + "/users/me";
    fetch(url, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        if (typeof fSuccess === "function") {
          fSuccess(res);
        }
      })
      .catch(() => {
        if (typeof fFailed === "function") {
          fFailed();
        }
      });
  }

  getInitialCards(success) {
    const url = this._options.baseUrl + "/cards";

    fetch(url, {
      headers: this._options.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        if (typeof success === "function") {
          success(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
