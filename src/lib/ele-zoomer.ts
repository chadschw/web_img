
import {Ele} from "./ele";
import {Point} from "./point"
import { Zoom1d } from "./zoom1d";

export class EleZoomer {

    get size(): Point { return this._size; }

    constructor(private _ele: Ele, private _pos: Point) {
        this._ele.style.display = "block";
        this._ele.style.position = "absolute";

        this._ele.target.addEventListener("mousemove", (e)=>this._onMouseMove(e));
        this._ele.target.addEventListener("mousewheel", (e)=>this._onMouseWheel(e));
    }

    setSize(size: Point) {
        this._size = size;
        this._ele.style.width = size.x + this._px;
        this._ele.style.height = size.y + this._px;
    }

    private _onMouseMove(e:MouseEvent) {
        this._mousePos.updateFromMouseEvent(e);
        e.preventDefault();
        e.stopPropagation();
    }

    private _onMouseWheel(e:MouseWheelEvent) {
        let delta = (e.wheelDeltaY > 0) ? 1.1 : 0.9;
        this.zoom(delta, this._mousePos);
        e.preventDefault();
        e.stopPropagation();
    }

    zoom(zoomRatio: number, zoomPoint: Point) {

        let x = this._mousePos.x;
        let y = this._mousePos.y;

        let x1 = this._pos.x;
        let y1 = this._pos.y;

        let x2 = x1 + this.size.x;
        let y2 = y1 + this.size.y;

        let newX1X2 = Zoom1d.zoom(x, x1, x2, zoomRatio);
        let newY1Y2 = Zoom1d.zoom(y, y1, y2, zoomRatio);

        this._pos.x = newX1X2[0];
        this._pos.y = newY1Y2[0];
        this._setPos(this._pos);
        
        this.size.x = newX1X2[1] - newX1X2[0];
        this.size.y = newY1Y2[1] - newY1Y2[0];
        this.setSize(this.size);
    }

    private _setPos(pos: Point) {
        this._ele.style.left = pos.x + this._px;
        this._ele.style.top = pos.y + this._px;
    }

    private _size: Point = new Point(0, 0);
    private _mousePos: Point = new Point(0,0);
    private readonly _px = "px";
}