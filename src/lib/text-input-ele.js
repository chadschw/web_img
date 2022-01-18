import { Ele } from "./ele";
export class TextInputEle extends Ele {
    get textInputElement() { return this.target; }
    get value() { return this.textInputElement.value; }
    constructor() {
        super();
        this.target = document.createElement("input");
    }
}
//# sourceMappingURL=text-input-ele.js.map