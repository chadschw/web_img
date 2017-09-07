import {Ele} from "./ele";

export class ButtonEle extends Ele {
    
    public get buttonElement(): HTMLButtonElement { return this.target as HTMLButtonElement; }

    constructor(buttonText: string, private _onClicked: () => void) {
        super();
        this.target = document.createElement("button");
        this.buttonElement.innerHTML = buttonText;
        this.buttonElement.onclick = this._onClicked;
    }
}
