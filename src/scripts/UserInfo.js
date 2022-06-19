export class UserInfo {
  constructor({profileNameSelector, profileJobSelector}){
    this._nameElement = document.querySelector(profileNameSelector)
    this._jobElement = document.querySelector(profileJobSelector)
  }
  getUserInfo(){
    return{
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    }
  }
  setUserInfo(user) {
    this._nameElement.textContent = user.name;
    this._jobElement.textContent = user.job;
  }
}