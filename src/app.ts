
import {TextInputEle} from "./lib/text-input-ele";
import {ButtonEle} from "./lib/button-ele";
import {ImgEle} from "./lib/img-ele";
import {ImgDragZoomEle, ImgDragZoomEleModel} from "./lib/img-drag-zoom-ele";
import {VideoEle} from "./lib/video-ele";
import {VideoDragZoomEle} from "./lib/video-drag-zoom-ele";
import {AxisEle} from "./lib/axis-ele";
import {WebApp} from "./lib/web-app";
import {Model} from "./lib/model";

class WebImgApp extends WebApp {
    
    private _axis = new AxisEle();
    //private _imgSrcInput = new TextInputEle();
    //private _loadImgButton = new ButtonEle("Load Img", () => this.onLoadImgButtonClick());
    //private _videoSrcInput = new TextInputEle();
    //private _loadVideoButton = new ButtonEle("Load Video", () => this.onLoadVideoButtonClick());
    private _saveButton = new ButtonEle("Save", () => this.onSave());
    private _loadButton = new ButtonEle("Load", () => this.onLoad());
    
    constructor() {
        super();

        // todo: fix this craziness!
        this._saveButton.style.position = "relative";
        this._loadButton.style.position = "relative";

        this._saveButton.style.zIndex = "10";
        this._loadButton.style.zIndex = "10";
        // end craziness.

        this.addChildren([
            this._axis,
            this._saveButton,
            this._loadButton
        ]);

        this._removeImgEle = (imgToRemove: ImgEle)=>this._axis.removeChild(imgToRemove);

        window.addEventListener("paste", (e) => this._onPaste(e));
    }

    private _removeImgEle: (imgToRemove: ImgEle) => void;

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

        if (imgExtensions.filter(s => s === extension).length === 1) {
            this._axis.addDragZoomEle(new ImgDragZoomEle(src, this._removeImgEle));
            return;
        }
        
        let vidExtensions = [
            "mp4",
            "webm"
        ];

        if (vidExtensions.filter(s => s === extension).length === 1) {
            this._axis.addDragZoomEle(new VideoDragZoomEle(src, (videoToRemove: VideoEle)=>this.removeChild(videoToRemove)));
        }
    }

    private onSave() {
        let models: Array<Model> = [];
        this._axis.children.forEach((child: ImgDragZoomEle) => {
            models.push(child.toModel());
        });

        // alert(JSON.stringify(models));
        localStorage[this.cookieName] = JSON.stringify(models);
    }

    private onLoad() {
        if (!localStorage[this.cookieName]) {
            return;
        }

        // ugly.
        while(this._axis.children.length > 0) {
            this._axis.children[0].removeChild(this._axis.children[0]);
        }

        let models: Array<Model> = JSON.parse(localStorage[this.cookieName]);
        models.forEach((model: ImgDragZoomEleModel) => {
            let ele: ImgDragZoomEle = ImgDragZoomEle.fromModel(model, this._removeImgEle);
            this._axis.addChild(ele);
        });
    }

    cookieName = "web-mg-save-data";
}

window.onload = () => {
    try {
        new WebImgApp();
    } catch (e) {
        console.error(e);
    }
}