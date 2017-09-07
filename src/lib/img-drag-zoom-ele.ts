
import {ImgEle, ImgEleModel} from "./img-ele";
import {Point} from "./point"

import {EleDragger} from "./ele-dragger";
import {EleZoomer} from "./ele-zoomer";
import {Model} from "./model";

export class ImgDragZoomEle extends ImgEle {

    get pos(): Point { return this._pos; }
    dragger: EleDragger;
    zoomer: EleZoomer;

    constructor(src: string = null, onRemoved: (i: ImgEle) => void) {
        super(src, onRemoved);

        this._pos = new Point(0, 0);
        this.dragger = new EleDragger(this, this._pos);
        this.zoomer = new EleZoomer(this, this._pos);

        this.imgElement.addEventListener("load", ()=>this._onLoaded());
    }

    toModel(): Model {
        return new ImgDragZoomEleModel(
            this._pos.toModel(),
            this.zoomer.size.toModel(),
            super.toModel() as ImgEleModel);
    }
    
    static fromModel(model: ImgDragZoomEleModel, onRemoved: (i: ImgEle) => void): ImgDragZoomEle {
        let img = new ImgDragZoomEle(model.imgEleModel.src, onRemoved);
        img._pos.x = model.pos.x;
        img._pos.y = model.pos.y;
        img.dragger.setPos(img._pos);
        img.zoomer.setSize(new Point(model.size.x, model.size.y));
        return img;
    }

    private _onLoaded() {
        if (this.zoomer.size.x === 0) {
            this.zoomer.setSize(new Point(this.imgElement.naturalWidth, this.imgElement.naturalHeight));
        }
    }

    private _pos: Point;
}

export class ImgDragZoomEleModel extends Model {
    constructor(
        public pos: Point,
        public size: Point,
        public imgEleModel: ImgEleModel) {
            super();
        }
}