
import {TextInputEle} from "./lib/text-input-ele";
import {ButtonEle} from "./lib/button-ele";
import {ImgEle} from "./lib/img-ele";
import {ImgDragZoomEle, ImgDragZoomEleModel} from "./lib/img-drag-zoom-ele";
import {VideoEle} from "./lib/video-ele";
import {VideoDragZoomEle} from "./lib/video-drag-zoom-ele";
import {AxisEle} from "./lib/axis-ele";
import {WebApp} from "./lib/web-app";
import {Model} from "./lib/model";

import {Controls} from "./controls";

class WebImgApp extends WebApp {
    
    cookieName = "web-img-save-data";

    private _removeImgEle: (imgToRemove: ImgEle) => void = (imgToRemove: ImgEle)=>this._axis.removeChild(imgToRemove);
    private _axis = new AxisEle();
    private _controls = new Controls(this.cookieName, this._axis, this._removeImgEle);
    
    constructor() {
        super();

        this.addChildren([
            this._axis,
            this._controls,
        ]);

        window.addEventListener("paste", (e) => this._onPaste(e));
        window.addEventListener("keydown", (e: KeyboardEvent)=> this.toggleControls(e));
    }

    private _onPaste(e: any) {
        let src: string = e.clipboardData.getData("text/plain");
        if (src.length === 0) { return; }
        
        let dotIdx = src.lastIndexOf(".");
        if (dotIdx < 0) { return; }

        let extension = src.substr(dotIdx + 1);

        let imgExtensions = [
            "gif",
            "jpg",
            "jpeg",
            "png",
        ];

        if (imgExtensions.filter(s => src.includes(s)).length ===1) {
            this._axis.addDragZoomEle(new ImgDragZoomEle(src, this._removeImgEle));
            return;
        }
        
        let vidExtensions = [
            "mp4",
            "webm"
        ];

        if (vidExtensions.filter(s => src.includes(s)).length ===1) {
            this._axis.addDragZoomEle(new VideoDragZoomEle(src, (videoToRemove: VideoEle)=>this.removeChild(videoToRemove)));
        }
    }

    private toggleControls(e: KeyboardEvent) {
        if (e.key !== " ") { return; }

        if (this._controls.target.style.display === "none") {
            this._controls.target.style.display = "block";
        } else {
            this._controls.target.style.display = "none";
        }
    }
}

window.onload = () => {
    try {
        new WebImgApp();
    } catch (e) {
        console.error(e);
    }
}