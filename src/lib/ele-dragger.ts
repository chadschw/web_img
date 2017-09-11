
import {Ele} from "./ele";
import {Point, PointAverager} from "./point"
import {Keys} from "./keys"

export class EleDragger {
    constructor(private _ele: Ele, private _pos: Point) {
        this._ele.style.display = "block";
        this._ele.style.position = "absolute";
        this.setPos(this._pos);

        let move = (e)=>this._onMouseMove(e);
        let down = (e)=> this._onMouseDown(e);
        let up = (e)=> this._onMouseUp(e);

        this._ele.target.addEventListener("mousemove", move);
        this._ele.target.addEventListener("mousedown", down);
        this._ele.target.addEventListener("mouseup", up);
    }

    setPos(pos: Point) {
        this._ele.style.left = pos.x + this._px;
        this._ele.style.top = pos.y + this._px;
    }

    private _onMouseMove(e:MouseEvent) {
        let oldMousePos = this._mousePos.copy();
        this._mousePos.updateFromMouseEvent(e);

        if (this._dragging) {
            let delta = this._mousePos.subtract(oldMousePos);
            this._pos.bumpBy(delta);
            this.setPos(this._pos);

            if (this._timerHandle !== -1) { clearTimeout(this._timerHandle); }

            this._timerHandle = setTimeout(()=>this._dragTimeout(), 100);
            this._velocityAverager.push(delta);
        }

        e.preventDefault();
        e.stopPropagation();
    }

    private _onMouseDown(e:MouseEvent) {
        this._dragging = true;
        this._velocityAverager.clear();
        this._velocity = new Point();
        e.preventDefault();
        e.stopPropagation();
    }

    private _onMouseUp(e:MouseEvent) {
        this._dragging = false;
        this._velocity = this._velocityAverager.average;
        if (this._timerHandle !== -1) { clearTimeout(this._timerHandle); }
        this._timerHandle = setInterval(() => this._coast(), 13);

        e.preventDefault();
        e.stopPropagation();
    }

    private _dragTimeout() {
        this._velocityAverager.clear();
    }

    private _coast() {
        let xVel = Math.abs(this._velocity.x);
        let yVel = Math.abs(this._velocity.y);

        if (xVel < 0.01 && yVel < 0.01) {
            clearInterval(this._timerHandle);
            this._timerHandle = -1;
            this._velocity = new Point(0,0);
        } else {
            this._pos.bumpBy(this._velocity);
            this.setPos(this._pos);
            this._velocity.x *= 0.95;
            this._velocity.y *= 0.95;
        }
    }

    private readonly _px = "px";
    private _mousePos: Point = new Point(0,0);
    private _dragging: boolean = false;

    // todo: the "coast" function is copied between here and axis-ele.ts. Need to combine these so we don't repeat the code.
    private _timerHandle = -1;
    private _velocity: Point = new Point(0,0);
    private _velocityAverager = new PointAverager();
}