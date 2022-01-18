import { Ele } from "./ele";
import { Model } from "./model";
export class ImgEle extends Ele {
    constructor(src = null, _onRemoved) {
        super();
        this._onRemoved = _onRemoved;
        this.target = document.createElement("img");
        this.src = src;
        this.imgElement.addEventListener("contextmenu", (e) => this._onContextMenu(e));
    }
    get imgElement() { return this.target; }
    set src(src) {
        if (src === null) {
            this.imgElement.style.display = "hidden";
        }
        else {
            this.imgElement.style.display = "block";
            this.imgElement.src = src;
        }
    }
    toModel() {
        return new ImgEleModel(this.imgElement.src);
    }
    _onContextMenu(e) {
        this._onRemoved(this);
        e.preventDefault();
        e.stopPropagation();
    }
}
export class ImgEleModel extends Model {
    constructor(src) {
        super();
        this.src = src;
    }
}
//# sourceMappingURL=img-ele.js.map