import { DivEle } from "./div-ele";
import { Point, PointAverager } from "./point";
import { Zoom1d } from "./zoom1d";
/**
 * The intent of this element is to fill the whole screen and allow child elemements to
 * be drug around google maps style... but without the tile-loading nature.
 *
 * When a veil is placed over all the images mouse drags and zooms affect all images. When the veil is behind all the
 * images mouse drags and zooms when over an image affect only that image (position and size individual images).
 */
export class AxisEle extends DivEle {
    constructor() {
        super();
        this.toggleIndividualImgZoomKey = "a";
        this._mousePos = new Point();
        this._dragging = false;
        this._veil = new DivEle();
        // todo: the "coast" function is copied between here and ele-dragger.ts. Need to combine these so we don't repeat the code.
        this._timerHandle = -1;
        this._velocity = new Point(0, 0);
        this._velocityAverager = new PointAverager();
        this._setupStyle();
        this._setupVeil();
        this._setupKeyDownEventListener();
    }
    _setupStyle() {
        this.target.classList.add("axis-ele");
    }
    _setupVeil() {
        this._setupVeilStyle();
        this._createVeilEventListeners();
        this.addUntrackedChild(this._veil);
    }
    _setupVeilStyle() {
        this._veil.target.classList.add("axis-veil-ele");
        this._veil.style.zIndex = "6";
    }
    _createVeilEventListeners() {
        this._veil.target.addEventListener("mousedown", (e) => this._mouseDown(e));
        this._veil.target.addEventListener("mouseup", (e) => this._mouseUp(e));
        this._veil.target.addEventListener("mousemove", (e) => this._mouseMove(e));
        this._veil.target.addEventListener("wheel", (e) => this._mouseWheel(e));
        this._veil.target.addEventListener("contextmenu", (e) => this._onContextMenu(e));
    }
    _setupKeyDownEventListener() {
        window.addEventListener("keydown", (e) => {
            if (e.key === this.toggleIndividualImgZoomKey) {
                if (this._veil.style.zIndex === "6") {
                    this._veil.style.zIndex = "1";
                }
                else {
                    this._veil.style.zIndex = "6";
                }
            }
        });
    }
    addDragZoomEle(child) {
        super.addChild(child);
    }
    _mouseDown(e) {
        this._dragging = true;
        this._velocityAverager.clear();
        this._velocity = new Point();
        e.preventDefault();
        e.stopPropagation();
    }
    _mouseUp(e) {
        this._dragging = false;
        this._velocity = this._velocityAverager.average;
        if (this._timerHandle !== -1) {
            clearTimeout(this._timerHandle);
        }
        this._timerHandle = setInterval(() => this._coast(), 13);
        e.preventDefault();
        e.stopPropagation();
    }
    _mouseMove(e) {
        let oldMousePos = this._mousePos.copy();
        this._mousePos.updateFromMouseEvent(e);
        if (this._dragging) {
            let delta = this._mousePos.subtract(oldMousePos);
            this.children.forEach((child) => {
                child.pos.bumpBy(delta);
                child.dragger.setPos(child.pos);
            });
            if (this._timerHandle !== -1) {
                clearTimeout(this._timerHandle);
            }
            this._timerHandle = setTimeout(() => this._dragTimeout(), 100);
            this._velocityAverager.push(delta);
        }
        e.preventDefault();
        e.stopPropagation();
    }
    _dragTimeout() {
        this._velocityAverager.clear();
    }
    _coast() {
        let xVel = Math.abs(this._velocity.x);
        let yVel = Math.abs(this._velocity.y);
        if (xVel < 0.01 && yVel < 0.01) {
            clearInterval(this._timerHandle);
            this._timerHandle = -1;
            this._velocity = new Point(0, 0);
        }
        else {
            this.children.forEach((child) => {
                child.pos.bumpBy(this._velocity);
                child.dragger.setPos(child.pos);
            });
            this._velocity.x *= 0.95;
            this._velocity.y *= 0.95;
        }
    }
    _mouseWheel(e) {
        let zoom = (e.deltaY < 0) ? 1.1 : 0.9;
        this.children.forEach((child) => {
            this._zoomChild(child, zoom);
        });
        e.preventDefault();
        e.stopPropagation();
    }
    _zoomChild(child, zoomPercent) {
        let x = this._mousePos.x;
        let y = this._mousePos.y;
        let x1 = child.pos.x;
        let y1 = child.pos.y;
        let x2 = x1 + child.zoomer.size.x;
        let y2 = y1 + child.zoomer.size.y;
        let newX1X2 = Zoom1d.zoom(x, x1, x2, zoomPercent);
        //noinspection JSSuspiciousNameCombination
        let newY1Y2 = Zoom1d.zoom(y, y1, y2, zoomPercent);
        child.pos.x = newX1X2[0];
        child.pos.y = newY1Y2[0];
        child.dragger.setPos(child.pos);
        child.zoomer.size.x = newX1X2[1] - newX1X2[0];
        child.zoomer.size.y = newY1Y2[1] - newY1Y2[0];
        child.zoomer.setSize(child.zoomer.size);
    }
    //noinspection JSMethodCanBeStatic
    _onContextMenu(e) {
        e.preventDefault();
        e.stopPropagation();
    }
}
//# sourceMappingURL=axis-ele.js.map