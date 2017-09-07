
import {Ele} from "./ele";

export class VideoEle extends Ele {
    public get videoElement(): HTMLVideoElement { return this.target as HTMLVideoElement; }
    public set src(src: string) {
        if (src === null) {
            this.videoElement.style.display = "hidden";
        } else {
            this.videoElement.style.display = "block";
            this.videoElement.src = src; 
            //this.videoElement.autoplay = true;
            this.videoElement.controls = true;
            this.videoElement.loop = true;
            this.videoElement.playbackRate = 1.0;
        }
    }

    constructor(src: string = null, private _onRemoved: (i: VideoEle) => void) {
        super();
        this.target = document.createElement("video");
        this.src = src;
        this.videoElement.addEventListener("contextmenu", (e)=>this._onContextMenu(e));
    }

    private _onContextMenu(e: MouseEvent) {
        this._onRemoved(this);
        e.preventDefault();
    }
}