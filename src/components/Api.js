class Api {
    constructor({ baseUrl, headers}) {
        this._headers = headers
        this._baseUrl = baseUrl
      // тело конструктора
    }

// ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ

    getProfile () {
      return fetch (`${this._baseUrl}/users/me`, {
            headers: this._headers
        }).then(res=>res.ok ? res.json() : Promise.reject(res.status))
      //  .catch(console.log)
    }

// КАРТОЧКИ

    getInitialCards() {
      return fetch (`${this._baseUrl}/cards`, {
          headers: this._headers
      }).then(res=>res.ok ? res.json() : Promise.reject(res.status))
    //  .catch(console.log)
    }

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

    editProfile(item) {
      return fetch (`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            name: item.name, 
            about: item.job
          })
      }).then(res => res.ok ? res.json() : Promise.reject(res.status))
      .catch(console.log)
    }

// АВАТАР

editAvatar(item) {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: item.avatar
    })
  }).then(res => res.ok ? res.json() : Promise.reject(res.status))
}

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ

    addCard(name, link) {
      return fetch (`${this._baseUrl}/cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name, 
            link
          })
      }).then(res=>res.ok ? res.json() : Promise.reject(res.status))
    }

// УДАЛЕНИЕ КАРТОЧКИ

    deleteCard(id) {
      return fetch (`${this._baseUrl}/cards/${id}`, {
          method: "DELETE",
          headers: this._headers
      }).then(res=>res.ok ? res.json() : Promise.reject(res.status))
    }

// СНЯТИЕ ЛАЙКА

    deleteLike(id) {
      return fetch (`${this._baseUrl}/cards/likes/${id}`, {
          method: "DELETE",
          headers: this._headers
      }).then(res=>res.ok ? res.json() : Promise.reject(res.status))
    }
  
// ПОСТАНОВКА ЛАЙКА

  addLike(id) {
      return fetch (`${this._baseUrl}/cards/likes/${id}`, {
          method: "PUT",
          headers: this._headers
      }).then(res=>res.ok ? res.json() : Promise.reject(res.status))
    }
  }
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
    headers: {
      authorization: '2d3b8a20-7c88-48c1-9e40-d676058753f5',
      'Content-Type': 'application/json'
    }
  }); 
