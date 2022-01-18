export class Keys {
    constructor() {
        this.downKeys = "";
        window.addEventListener("keydown", (e) => {
            if (this.downKeys.indexOf(e.key) < 0) {
                this.downKeys = this.downKeys + e.key;
            }
        });
        window.addEventListener("keyup", (e) => {
            this.downKeys = this.downKeys.replace(e.key, "");
        });
    }
    static get instance() {
        if (Keys._instance === null) {
            Keys._instance = new Keys();
        }
        return Keys._instance;
    }
    isDown(key) {
        return this.downKeys.indexOf(key) >= 0;
    }
}
Keys._instance = null;
//# sourceMappingURL=keys.js.map