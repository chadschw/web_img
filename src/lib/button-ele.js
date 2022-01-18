import { Ele } from "./ele";
export class ButtonEle extends Ele {
    constructor(buttonText, _onClicked) {
        super();
        this._onClicked = _onClicked;
        this.target = document.createElement("button");
        this.buttonElement.innerHTML = buttonText;
        this.buttonElement.onclick = this._onClicked;
    }
    get buttonElement() { return this.target; }
}
//# sourceMappingURL=button-ele.js.map