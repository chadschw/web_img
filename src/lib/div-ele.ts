
import {Ele} from "./ele";

export class DivEle extends Ele {
    constructor() {
        super();
        this.target = document.createElement("div");
    }
}