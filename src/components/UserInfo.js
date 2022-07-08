export class UserInfo {
    constructor({ profileNameSelector, profileJobSelector, avatarSelector }) {
        this._nameElement = document.querySelector(profileNameSelector);
        this._jobElement = document.querySelector(profileJobSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent,
        };
    }
    setUserInfo(user) {
        this._nameElement.textContent = user.name;
        this._jobElement.textContent = user.about;
        this._avatarElement.src = user.avatar;      
    }
  }