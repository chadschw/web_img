
import {Ele} from "./ele";

export class TextInputEle extends Ele {
    
    public get textInputElement(): HTMLInputElement { return this.target as HTMLInputElement; }
    public get value(): string { return this.textInputElement.value; }    
    
    constructor() {
        super();
        this.target = document.createElement("input");
    }
}