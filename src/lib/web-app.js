export class WebApp {
    constructor() {
        this._children = [];
    }
    addChildren(children) {
        children.forEach((child) => this.addChild(child));
    }
    addChild(child) {
        this._children.push(child);
        window.document.body.appendChild(child.target);
    }
    removeChild(child) {
        let childIndex = this._children.indexOf(child);
        if (childIndex < 0) {
            throw new Error("Attempted to remove unknown child");
        }
        this._children.splice(childIndex, 1);
        window.document.body.removeChild(child.target);
        child = null;
        console.log("num web app children: " + this._children.length);
    }
}
//# sourceMappingURL=web-app.js.map