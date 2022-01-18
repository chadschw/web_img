import { VideoEle } from "./video-ele";
import { Point } from "./point";
import { EleDragger } from "./ele-dragger";
import { EleZoomer } from "./ele-zoomer";
export class VideoDragZoomEle extends VideoEle {
    constructor(src = null, onRemoved) {
        super(src, onRemoved);
        this._pos = new Point(0, 0);
        this.dragger = new EleDragger(this, this._pos);
        this.zoomer = new EleZoomer(this, this._pos);
        this.videoElement.addEventListener("loadeddata", () => this._onLoaded());
    }
    get pos() { return this._pos; }
    _onLoaded() {
        this.zoomer.setSize(new Point(this.videoElement.videoWidth, this.videoElement.videoHeight));
    }
}
//# sourceMappingURL=video-drag-zoom-ele.js.map