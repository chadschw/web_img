import { Ele } from "./ele";
export class TextAreaEle extends Ele {
    get textAreaElement() { return this.target; }
    get text() { return this.textAreaElement.value; }
    set text(t) {
        this.textAreaElement.value = t;
    }
    constructor() {
        super();
        this.target = document.createElement("textarea");
    }
}
//# sourceMappingURL=text-area-ele.js.map