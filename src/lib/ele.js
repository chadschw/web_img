export class Ele {
    constructor() {
        this.children = [];
    }
    get style() { return this.target.style; }
    addChild(child) {
        this.children.push(child);
        this.target.appendChild(child.target);
    }
    // Add a child that isn't in the children list and won't get unloaded.
    addUntrackedChild(child) {
        this.target.appendChild(child.target);
    }
    addChildren(children) {
        children.forEach((child) => this.addChild(child));
    }
    removeChild(child) {
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
//# sourceMappingURL=ele.js.map