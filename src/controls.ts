
import {DivEle} from "./lib/div-ele";
import {ButtonEle} from "./lib/button-ele"; 
import {TextAreaEle} from "./lib/text-area-ele";
import {AxisEle} from "./lib/axis-ele";
import {ImgEle} from "./lib/img-ele";
import {ImgDragZoomEle, ImgDragZoomEleModel} from "./lib/img-drag-zoom-ele";
import {Model} from "./lib/model";

export class Controls extends DivEle {

    constructor(public cookieName: string, public axis: AxisEle, public onRemove: (imgToRemove: ImgEle) => void) {
        super();

        this.target.classList.add("controls");
        this.style.display = "none";

        this._textArea.textAreaElement.cols = 100;
        this._textArea.textAreaElement.rows = 5;
        this._textArea.text = localStorage[cookieName];
        
        let textContainer = new DivEle();
        textContainer.style.padding = "10px";
        textContainer.addChild(this._textArea);

        let buttonContainer = new DivEle();
        buttonContainer.style.padding = "10px";
        buttonContainer.addChildren([
            new ButtonEle("Apply JSON", ()=> this.applyJSON()),
            new ButtonEle("Save Chagnes", ()=> this.saveChanges())
        ]);
        
        this.addChildren([
            textContainer,
            buttonContainer
        ]);
    }

    private applyJSON() {
        let newJSON = this._textArea.text;

        if (newJSON.length === 0) { newJSON = "[]"; }

        let models: Array<Model>;
        try {
            models = JSON.parse(newJSON);
        } catch (e) {
            alert("Failed to parse JSON: " + e);
        }

        // ugly.
        while(this.axis.children.length > 0) {
            this.axis.children[0].removeChild(this.axis.children[0]);
        }

        models.forEach((model: ImgDragZoomEleModel) => {
            let ele: ImgDragZoomEle = ImgDragZoomEle.fromModel(model, this.onRemove);
            this.axis.addChild(ele);
        });
    }

    private saveChanges() {
        let models: Array<Model> = [];
        this.axis.children.forEach((child: ImgDragZoomEle) => {
            models.push(child.toModel());
        });

        // alert(JSON.stringify(models));
        localStorage[this.cookieName] = JSON.stringify(models);
    }

    private _textArea: TextAreaEle = new TextAreaEle();
}