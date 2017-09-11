
import {Ele} from "./ele";

export class TextAreaEle extends Ele {

    get textAreaElement(): HTMLTextAreaElement { return this.target as HTMLTextAreaElement;}
    get text(): string { return this.textAreaElement.value; }
    set text(t: string) {
        this.textAreaElement.value = t;
    }

    constructor() {
        super();
        this.target = document.createElement("textarea");
    }
}