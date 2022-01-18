import { Point } from "./point";
import { Zoom1d } from "./zoom1d";
export class EleZoomer {
    constructor(_ele, _pos) {
        this._ele = _ele;
        this._pos = _pos;
        this._size = new Point(0, 0);
        this._mousePos = new Point(0, 0);
        this._px = "px";
        this._ele.style.display = "block";
        this._ele.style.position = "absolute";
        this._ele.target.addEventListener("mousemove", (e) => this._onMouseMove(e));
        this._ele.target.addEventListener("wheel", (e) => this._onMouseWheel(e));
    }
    get size() { return this._size; }
    setSize(size) {
        this._size = size;
        this._ele.style.width = size.x + this._px;
        this._ele.style.height = size.y + this._px;
    }
    _onMouseMove(e) {
        this._mousePos.updateFromMouseEvent(e);
        e.preventDefault();
        e.stopPropagation();
    }
    _onMouseWheel(e) {
        let delta = (e.deltaY > 0) ? 1.1 : 0.9;
        this.zoom(delta, this._mousePos);
        e.preventDefault();
        e.stopPropagation();
    }
    zoom(zoomRatio, zoomPoint) {
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
    _setPos(pos) {
        this._ele.style.left = pos.x + this._px;
        this._ele.style.top = pos.y + this._px;
    }
}
//# sourceMappingURL=ele-zoomer.js.map