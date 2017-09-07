
import {Ele} from "./ele";
import {Model} from "./model";

export class ImgEle extends Ele {

    public get imgElement(): HTMLImageElement { return this.target as HTMLImageElement }
    public set src(src: string) { 
        if (src === null) {
            this.imgElement.style.display = "hidden";
        } else {
            this.imgElement.style.display = "block";
            this.imgElement.src = src; 
        }
    }
    
    constructor(src: string = null, private _onRemoved: (i: ImgEle) => void) {
        super();
        this.target = document.createElement("img");
        this.src = src;

        this.imgElement.addEventListener("contextmenu", (e)=>this._onContextMenu(e));
    }

    toModel(): Model {
        return new ImgEleModel(this.imgElement.src);
    }

    private _onContextMenu(e: MouseEvent) {
        this._onRemoved(this);
        e.preventDefault();
        e.stopPropagation();
    }
}

export class ImgEleModel extends Model {
    constructor(public src: string) {
        super();
    }
}