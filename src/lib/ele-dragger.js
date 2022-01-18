import { Point, PointAverager } from "./point";
export class EleDragger {
    constructor(_ele, _pos) {
        this._ele = _ele;
        this._pos = _pos;
        this._px = "px";
        this._mousePos = new Point(0, 0);
        this._dragging = false;
        // todo: the "coast" function is copied between here and axis-ele.ts. Need to combine these so we don't repeat the code.
        this._timerHandle = -1;
        this._velocity = new Point(0, 0);
        this._velocityAverager = new PointAverager();
        this._ele.style.display = "block";
        this._ele.style.position = "absolute";
        this.setPos(this._pos);
        let move = (e) => this._onMouseMove(e);
        let down = (e) => this._onMouseDown(e);
        let up = (e) => this._onMouseUp(e);
        this._ele.target.addEventListener("mousemove", move);
        this._ele.target.addEventListener("mousedown", down);
        this._ele.target.addEventListener("mouseup", up);
    }
    setPos(pos) {
        this._ele.style.left = pos.x + this._px;
        this._ele.style.top = pos.y + this._px;
    }
    _onMouseMove(e) {
        let oldMousePos = this._mousePos.copy();
        this._mousePos.updateFromMouseEvent(e);
        if (this._dragging) {
            let delta = this._mousePos.subtract(oldMousePos);
            this._pos.bumpBy(delta);
            this.setPos(this._pos);
            if (this._timerHandle !== -1) {
                clearTimeout(this._timerHandle);
            }
            this._timerHandle = setTimeout(() => this._dragTimeout(), 100);
            this._velocityAverager.push(delta);
        }
        e.preventDefault();
        e.stopPropagation();
    }
    _onMouseDown(e) {
        this._dragging = true;
        this._velocityAverager.clear();
        this._velocity = new Point();
        e.preventDefault();
        e.stopPropagation();
    }
    _onMouseUp(e) {
        this._dragging = false;
        this._velocity = this._velocityAverager.average;
        if (this._timerHandle !== -1) {
            clearTimeout(this._timerHandle);
        }
        this._timerHandle = setInterval(() => this._coast(), 13);
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
            this._pos.bumpBy(this._velocity);
            this.setPos(this._pos);
            this._velocity.x *= 0.95;
            this._velocity.y *= 0.95;
        }
    }
}
//# sourceMappingURL=ele-dragger.js.map