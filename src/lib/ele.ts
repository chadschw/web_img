
export class Ele {
    target: HTMLElement;

    get style(): CSSStyleDeclaration { return this.target.style; }

    children: Array<Ele> = [];

    constructor() {}

    addChild(child: Ele) {
        this.children.push(child);
        this.target.appendChild(child.target);
    }

    // Add a child that isn't in the children list and won't get unloaded.
    addUntrackedChild(child: Ele) {
        this.target.appendChild(child.target);
    }

    addChildren(children: Array<Ele>) {
        children.forEach((child: Ele) => this.addChild(child));
    }

    removeChild(child: Ele) {
        this.target.removeChild(child.target);
        this.children.splice(this.children.indexOf(child), 1);
        child._unload();
    }

    _unload() {
        this.children.forEach(child => child.unload);
        this.children = [];
        this.unload();
    }

    // Derived classes override this if you need to cancel any timers
    unload() {

    }
}
