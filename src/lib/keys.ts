
export class Keys {
    downKeys = "";

    private constructor() {
        window.addEventListener("keydown", (e: KeyboardEvent) => {
            if (this.downKeys.indexOf(e.key) < 0) {
                this.downKeys = this.downKeys + e.key;
            }
        });

        window.addEventListener("keyup", (e: KeyboardEvent) => {
            this.downKeys = this.downKeys.replace(e.key, "");
        });
    }

    static get instance(): Keys {
        if (Keys._instance === null) {
            Keys._instance = new Keys();
        }

        return Keys._instance;
    }

    isDown(key: string) {
        return this.downKeys.indexOf(key) >= 0;
    }

    private static _instance = null;
}