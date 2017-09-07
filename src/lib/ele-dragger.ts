
import {Ele} from "./ele";
import {Point} from "./point"
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
        }

        e.preventDefault();
        e.stopPropagation();
    }

    private _onMouseDown(e:MouseEvent) {
        this._dragging = true;
        e.preventDefault();
        e.stopPropagation();

    }

    private _onMouseUp(e:MouseEvent) {
        this._dragging = false;
        e.preventDefault();
        e.stopPropagation();
    }

    private readonly _px = "px";
    private _mousePos: Point = new Point(0,0);
    private _dragging: boolean = false;
}