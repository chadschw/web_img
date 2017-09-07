
import {Ele} from "./ele";

export class WebApp {
    
    constructor() {}
    
    addChildren(children: Array<Ele>) {
        children.forEach((child: Ele) => this.addChild(child));
    }

    addChild(child: Ele) {
        this._children.push(child);
        window.document.body.appendChild(child.target);
    }

    removeChild(child: Ele) {
        let childIndex = this._children.indexOf(child);
        if (childIndex < 0) { throw new Error("Attempted to remove unknown child"); }
        this._children.splice(childIndex, 1);
        window.document.body.removeChild(child.target);
        child = null;
        console.log("num web app children: " + this._children.length);
    }

    private _children: Array<Ele> = [];
}
