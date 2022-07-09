import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    open(text, link) {
        this._image = this._popup.querySelector(".popup__image");
        this._caption = this._popup.querySelector(".popup__caption");

        this._image.src = link;
        this._image.alt = text;
        this._caption.textContent = text;

        super.open();
    }
}