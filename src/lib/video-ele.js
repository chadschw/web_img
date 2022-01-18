import { Ele } from "./ele";
export class VideoEle extends Ele {
    constructor(src = null, _onRemoved) {
        super();
        this._onRemoved = _onRemoved;
        this.target = document.createElement("video");
        this.src = src;
        this.videoElement.addEventListener("contextmenu", (e) => this._onContextMenu(e));
    }
    get videoElement() { return this.target; }
    set src(src) {
        if (src === null) {
            this.videoElement.style.display = "hidden";
        }
        else {
            this.videoElement.style.display = "block";
            this.videoElement.src = src;
            //this.videoElement.autoplay = true;
            this.videoElement.controls = true;
            this.videoElement.loop = true;
            this.videoElement.playbackRate = 1.0;
        }
    }
    _onContextMenu(e) {
        this._onRemoved(this);
        e.preventDefault();
    }
}
//# sourceMappingURL=video-ele.js.map