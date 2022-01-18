import { ImgEle } from "./img-ele";
import { Point } from "./point";
import { EleDragger } from "./ele-dragger";
import { EleZoomer } from "./ele-zoomer";
import { Model } from "./model";
export class ImgDragZoomEle extends ImgEle {
    constructor(src = null, onRemoved) {
        super(src, onRemoved);
        this._pos = new Point(0, 0);
        this.dragger = new EleDragger(this, this._pos);
        this.zoomer = new EleZoomer(this, this._pos);
        this.imgElement.addEventListener("load", () => this._onLoaded());
    }
    get pos() { return this._pos; }
    toModel() {
        return new ImgDragZoomEleModel(this._pos.toModel(), this.zoomer.size.toModel(), super.toModel());
    }
    static fromModel(model, onRemoved) {
        let img = new ImgDragZoomEle(model.imgEleModel.src, onRemoved);
        img._pos.x = model.pos.x;
        img._pos.y = model.pos.y;
        img.dragger.setPos(img._pos);
        img.zoomer.setSize(new Point(model.size.x, model.size.y));
        return img;
    }
    _onLoaded() {
        if (this.zoomer.size.x === 0) {
            this.zoomer.setSize(new Point(this.imgElement.naturalWidth, this.imgElement.naturalHeight));
        }
    }
}
export class ImgDragZoomEleModel extends Model {
    constructor(pos, size, imgEleModel) {
        super();
        this.pos = pos;
        this.size = size;
        this.imgEleModel = imgEleModel;
    }
}
//# sourceMappingURL=img-drag-zoom-ele.js.map