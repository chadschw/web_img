/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point = (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Point.prototype.updateFromMouseEvent = function (e) {
        this.x = e.clientX;
        this.y = e.clientY;
    };
    Point.prototype.copy = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.bumpBy = function (other) {
        this.x = this.x + other.x;
        this.y = this.y + other.y;
    };
    Point.prototype.add = function (other) {
        return new Point(this.x + other.x, this.y + other.y);
    };
    Point.prototype.subtract = function (other) {
        return new Point(this.x - other.x, this.y - other.y);
    };
    Point.prototype.toModel = function () {
        return this.copy();
    };
    return Point;
}());
exports.Point = Point;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Ele = (function () {
    function Ele() {
        this.children = [];
    }
    Object.defineProperty(Ele.prototype, "style", {
        get: function () { return this.target.style; },
        enumerable: true,
        configurable: true
    });
    Ele.prototype.addChild = function (child) {
        this.children.push(child);
        this.target.appendChild(child.target);
    };
    // Add a child that isn't in the children list and won't get unloaded.
    Ele.prototype.addUntrackedChild = function (child) {
        this.target.appendChild(child.target);
    };
    Ele.prototype.addChildren = function (children) {
        var _this = this;
        children.forEach(function (child) { return _this.addChild(child); });
    };
    Ele.prototype.removeChild = function (child) {
        this.target.removeChild(child.target);
        this.children.splice(this.children.indexOf(child), 1);
        child._unload();
    };
    Ele.prototype._unload = function () {
        this.children.forEach(function (child) { return child.unload; });
        this.children = [];
        this.unload();
    };
    // Derived classes override this if you need to cancel any timers
    Ele.prototype.unload = function () {
    };
    return Ele;
}());
exports.Ele = Ele;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Model = (function () {
    function Model() {
    }
    return Model;
}());
exports.Model = Model;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = __webpack_require__(0);
var EleDragger = (function () {
    function EleDragger(_ele, _pos) {
        var _this = this;
        this._ele = _ele;
        this._pos = _pos;
        this._px = "px";
        this._mousePos = new point_1.Point(0, 0);
        this._dragging = false;
        this._ele.style.display = "block";
        this._ele.style.position = "absolute";
        this.setPos(this._pos);
        var move = function (e) { return _this._onMouseMove(e); };
        var down = function (e) { return _this._onMouseDown(e); };
        var up = function (e) { return _this._onMouseUp(e); };
        this._ele.target.addEventListener("mousemove", move);
        this._ele.target.addEventListener("mousedown", down);
        this._ele.target.addEventListener("mouseup", up);
    }
    EleDragger.prototype.setPos = function (pos) {
        this._ele.style.left = pos.x + this._px;
        this._ele.style.top = pos.y + this._px;
    };
    EleDragger.prototype._onMouseMove = function (e) {
        var oldMousePos = this._mousePos.copy();
        this._mousePos.updateFromMouseEvent(e);
        if (this._dragging) {
            var delta = this._mousePos.subtract(oldMousePos);
            this._pos.bumpBy(delta);
            this.setPos(this._pos);
        }
        e.preventDefault();
        e.stopPropagation();
    };
    EleDragger.prototype._onMouseDown = function (e) {
        this._dragging = true;
        e.preventDefault();
        e.stopPropagation();
    };
    EleDragger.prototype._onMouseUp = function (e) {
        this._dragging = false;
        e.preventDefault();
        e.stopPropagation();
    };
    return EleDragger;
}());
exports.EleDragger = EleDragger;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = __webpack_require__(0);
var zoom1d_1 = __webpack_require__(5);
var EleZoomer = (function () {
    function EleZoomer(_ele, _pos) {
        var _this = this;
        this._ele = _ele;
        this._pos = _pos;
        this._size = new point_1.Point(0, 0);
        this._mousePos = new point_1.Point(0, 0);
        this._px = "px";
        this._ele.style.display = "block";
        this._ele.style.position = "absolute";
        this._ele.target.addEventListener("mousemove", function (e) { return _this._onMouseMove(e); });
        this._ele.target.addEventListener("mousewheel", function (e) { return _this._onMouseWheel(e); });
    }
    Object.defineProperty(EleZoomer.prototype, "size", {
        get: function () { return this._size; },
        enumerable: true,
        configurable: true
    });
    EleZoomer.prototype.setSize = function (size) {
        this._size = size;
        this._ele.style.width = size.x + this._px;
        this._ele.style.height = size.y + this._px;
    };
    EleZoomer.prototype._onMouseMove = function (e) {
        this._mousePos.updateFromMouseEvent(e);
        e.preventDefault();
        e.stopPropagation();
    };
    EleZoomer.prototype._onMouseWheel = function (e) {
        var delta = (e.wheelDeltaY > 0) ? 1.1 : 0.9;
        this.zoom(delta, this._mousePos);
        e.preventDefault();
        e.stopPropagation();
    };
    EleZoomer.prototype.zoom = function (zoomRatio, zoomPoint) {
        var x = this._mousePos.x;
        var y = this._mousePos.y;
        var x1 = this._pos.x;
        var y1 = this._pos.y;
        var x2 = x1 + this.size.x;
        var y2 = y1 + this.size.y;
        var newX1X2 = zoom1d_1.Zoom1d.zoom(x, x1, x2, zoomRatio);
        var newY1Y2 = zoom1d_1.Zoom1d.zoom(y, y1, y2, zoomRatio);
        this._pos.x = newX1X2[0];
        this._pos.y = newY1Y2[0];
        this._setPos(this._pos);
        this.size.x = newX1X2[1] - newX1X2[0];
        this.size.y = newY1Y2[1] - newY1Y2[0];
        this.setSize(this.size);
    };
    EleZoomer.prototype._setPos = function (pos) {
        this._ele.style.left = pos.x + this._px;
        this._ele.style.top = pos.y + this._px;
    };
    return EleZoomer;
}());
exports.EleZoomer = EleZoomer;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Zoom1d = (function () {
    function Zoom1d() {
    }
    Zoom1d.zoom = function (zoomPoint, leftEdge, rightEdge, zoomPercent) {
        var delta;
        var newLeftEdge;
        var newRightEdge;
        var newWidth = (rightEdge - leftEdge) * zoomPercent;
        if (leftEdge > zoomPoint) {
            delta = leftEdge - zoomPoint;
            newLeftEdge = zoomPoint + (delta * zoomPercent);
            newRightEdge = newLeftEdge + newWidth;
        }
        else if (zoomPoint > rightEdge) {
            delta = zoomPoint - rightEdge;
            newRightEdge = zoomPoint - (delta * zoomPercent);
            newLeftEdge = newRightEdge - newWidth;
        }
        else {
            var left = zoomPoint - leftEdge;
            var right = rightEdge - zoomPoint;
            var newLeft = left * zoomPercent;
            var newRight = right * zoomPercent;
            newLeftEdge = zoomPoint - newLeft;
            newRightEdge = zoomPoint + newRight;
        }
        return [newLeftEdge, newRightEdge];
    };
    return Zoom1d;
}());
exports.Zoom1d = Zoom1d;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ele_1 = __webpack_require__(1);
var DivEle = (function (_super) {
    __extends(DivEle, _super);
    function DivEle() {
        var _this = _super.call(this) || this;
        _this.target = document.createElement("div");
        return _this;
    }
    return DivEle;
}(ele_1.Ele));
exports.DivEle = DivEle;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var img_drag_zoom_ele_1 = __webpack_require__(9);
var video_drag_zoom_ele_1 = __webpack_require__(11);
var axis_ele_1 = __webpack_require__(13);
var web_app_1 = __webpack_require__(14);
var controls_1 = __webpack_require__(15);
var WebImgApp = (function (_super) {
    __extends(WebImgApp, _super);
    function WebImgApp() {
        var _this = _super.call(this) || this;
        _this.cookieName = "web-img-save-data";
        _this._removeImgEle = function (imgToRemove) { return _this._axis.removeChild(imgToRemove); };
        _this._axis = new axis_ele_1.AxisEle();
        _this._controls = new controls_1.Controls(_this.cookieName, _this._axis, _this._removeImgEle);
        _this.addChildren([
            _this._axis,
            _this._controls,
        ]);
        window.addEventListener("paste", function (e) { return _this._onPaste(e); });
        window.addEventListener("keydown", function (e) { return _this.toggleControls(e); });
        return _this;
    }
    WebImgApp.prototype._onPaste = function (e) {
        var _this = this;
        var src = e.clipboardData.getData("text/plain");
        if (src.length === 0) {
            return;
        }
        var dotIdx = src.lastIndexOf(".");
        if (dotIdx < 0) {
            return;
        }
        var extension = src.substr(dotIdx + 1);
        var imgExtensions = [
            "gif",
            "jpg",
            "jpeg",
            "png",
        ];
        if (imgExtensions.filter(function (s) { return s === extension; }).length === 1) {
            this._axis.addDragZoomEle(new img_drag_zoom_ele_1.ImgDragZoomEle(src, this._removeImgEle));
            return;
        }
        var vidExtensions = [
            "mp4",
            "webm"
        ];
        if (vidExtensions.filter(function (s) { return s === extension; }).length === 1) {
            this._axis.addDragZoomEle(new video_drag_zoom_ele_1.VideoDragZoomEle(src, function (videoToRemove) { return _this.removeChild(videoToRemove); }));
        }
    };
    WebImgApp.prototype.toggleControls = function (e) {
        if (e.key !== " ") {
            return;
        }
        if (this._controls.target.style.display === "none") {
            this._controls.target.style.display = "block";
        }
        else {
            this._controls.target.style.display = "none";
        }
    };
    return WebImgApp;
}(web_app_1.WebApp));
window.onload = function () {
    try {
        new WebImgApp();
    }
    catch (e) {
        console.error(e);
    }
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ele_1 = __webpack_require__(1);
var ButtonEle = (function (_super) {
    __extends(ButtonEle, _super);
    function ButtonEle(buttonText, _onClicked) {
        var _this = _super.call(this) || this;
        _this._onClicked = _onClicked;
        _this.target = document.createElement("button");
        _this.buttonElement.innerHTML = buttonText;
        _this.buttonElement.onclick = _this._onClicked;
        return _this;
    }
    Object.defineProperty(ButtonEle.prototype, "buttonElement", {
        get: function () { return this.target; },
        enumerable: true,
        configurable: true
    });
    return ButtonEle;
}(ele_1.Ele));
exports.ButtonEle = ButtonEle;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var img_ele_1 = __webpack_require__(10);
var point_1 = __webpack_require__(0);
var ele_dragger_1 = __webpack_require__(3);
var ele_zoomer_1 = __webpack_require__(4);
var model_1 = __webpack_require__(2);
var ImgDragZoomEle = (function (_super) {
    __extends(ImgDragZoomEle, _super);
    function ImgDragZoomEle(src, onRemoved) {
        if (src === void 0) { src = null; }
        var _this = _super.call(this, src, onRemoved) || this;
        _this._pos = new point_1.Point(0, 0);
        _this.dragger = new ele_dragger_1.EleDragger(_this, _this._pos);
        _this.zoomer = new ele_zoomer_1.EleZoomer(_this, _this._pos);
        _this.imgElement.addEventListener("load", function () { return _this._onLoaded(); });
        return _this;
    }
    Object.defineProperty(ImgDragZoomEle.prototype, "pos", {
        get: function () { return this._pos; },
        enumerable: true,
        configurable: true
    });
    ImgDragZoomEle.prototype.toModel = function () {
        return new ImgDragZoomEleModel(this._pos.toModel(), this.zoomer.size.toModel(), _super.prototype.toModel.call(this));
    };
    ImgDragZoomEle.fromModel = function (model, onRemoved) {
        var img = new ImgDragZoomEle(model.imgEleModel.src, onRemoved);
        img._pos.x = model.pos.x;
        img._pos.y = model.pos.y;
        img.dragger.setPos(img._pos);
        img.zoomer.setSize(new point_1.Point(model.size.x, model.size.y));
        return img;
    };
    ImgDragZoomEle.prototype._onLoaded = function () {
        if (this.zoomer.size.x === 0) {
            this.zoomer.setSize(new point_1.Point(this.imgElement.naturalWidth, this.imgElement.naturalHeight));
        }
    };
    return ImgDragZoomEle;
}(img_ele_1.ImgEle));
exports.ImgDragZoomEle = ImgDragZoomEle;
var ImgDragZoomEleModel = (function (_super) {
    __extends(ImgDragZoomEleModel, _super);
    function ImgDragZoomEleModel(pos, size, imgEleModel) {
        var _this = _super.call(this) || this;
        _this.pos = pos;
        _this.size = size;
        _this.imgEleModel = imgEleModel;
        return _this;
    }
    return ImgDragZoomEleModel;
}(model_1.Model));
exports.ImgDragZoomEleModel = ImgDragZoomEleModel;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ele_1 = __webpack_require__(1);
var model_1 = __webpack_require__(2);
var ImgEle = (function (_super) {
    __extends(ImgEle, _super);
    function ImgEle(src, _onRemoved) {
        if (src === void 0) { src = null; }
        var _this = _super.call(this) || this;
        _this._onRemoved = _onRemoved;
        _this.target = document.createElement("img");
        _this.src = src;
        _this.imgElement.addEventListener("contextmenu", function (e) { return _this._onContextMenu(e); });
        return _this;
    }
    Object.defineProperty(ImgEle.prototype, "imgElement", {
        get: function () { return this.target; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImgEle.prototype, "src", {
        set: function (src) {
            if (src === null) {
                this.imgElement.style.display = "hidden";
            }
            else {
                this.imgElement.style.display = "block";
                this.imgElement.src = src;
            }
        },
        enumerable: true,
        configurable: true
    });
    ImgEle.prototype.toModel = function () {
        return new ImgEleModel(this.imgElement.src);
    };
    ImgEle.prototype._onContextMenu = function (e) {
        this._onRemoved(this);
        e.preventDefault();
        e.stopPropagation();
    };
    return ImgEle;
}(ele_1.Ele));
exports.ImgEle = ImgEle;
var ImgEleModel = (function (_super) {
    __extends(ImgEleModel, _super);
    function ImgEleModel(src) {
        var _this = _super.call(this) || this;
        _this.src = src;
        return _this;
    }
    return ImgEleModel;
}(model_1.Model));
exports.ImgEleModel = ImgEleModel;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var video_ele_1 = __webpack_require__(12);
var point_1 = __webpack_require__(0);
var ele_dragger_1 = __webpack_require__(3);
var ele_zoomer_1 = __webpack_require__(4);
var VideoDragZoomEle = (function (_super) {
    __extends(VideoDragZoomEle, _super);
    function VideoDragZoomEle(src, onRemoved) {
        if (src === void 0) { src = null; }
        var _this = _super.call(this, src, onRemoved) || this;
        _this._pos = new point_1.Point(0, 0);
        _this.dragger = new ele_dragger_1.EleDragger(_this, _this._pos);
        _this.zoomer = new ele_zoomer_1.EleZoomer(_this, _this._pos);
        _this.videoElement.addEventListener("loadeddata", function () { return _this._onLoaded(); });
        return _this;
    }
    Object.defineProperty(VideoDragZoomEle.prototype, "pos", {
        get: function () { return this._pos; },
        enumerable: true,
        configurable: true
    });
    VideoDragZoomEle.prototype._onLoaded = function () {
        this.zoomer.setSize(new point_1.Point(this.videoElement.videoWidth, this.videoElement.videoHeight));
    };
    return VideoDragZoomEle;
}(video_ele_1.VideoEle));
exports.VideoDragZoomEle = VideoDragZoomEle;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ele_1 = __webpack_require__(1);
var VideoEle = (function (_super) {
    __extends(VideoEle, _super);
    function VideoEle(src, _onRemoved) {
        if (src === void 0) { src = null; }
        var _this = _super.call(this) || this;
        _this._onRemoved = _onRemoved;
        _this.target = document.createElement("video");
        _this.src = src;
        _this.videoElement.addEventListener("contextmenu", function (e) { return _this._onContextMenu(e); });
        return _this;
    }
    Object.defineProperty(VideoEle.prototype, "videoElement", {
        get: function () { return this.target; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VideoEle.prototype, "src", {
        set: function (src) {
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
        },
        enumerable: true,
        configurable: true
    });
    VideoEle.prototype._onContextMenu = function (e) {
        this._onRemoved(this);
        e.preventDefault();
    };
    return VideoEle;
}(ele_1.Ele));
exports.VideoEle = VideoEle;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var div_ele_1 = __webpack_require__(6);
var point_1 = __webpack_require__(0);
var zoom1d_1 = __webpack_require__(5);
/**
 * The intent of this element is to fill the whole screen and allow child elemements to
 * be drug around google maps style... but without the tile-loading nature.
 *
 * When a veil is placed over all the images mouse drags and zooms affect all images. When the veil is behind all the
 * images mouse drags and zooms when over an image affect only that image (position and size individual images).
 */
var AxisEle = (function (_super) {
    __extends(AxisEle, _super);
    function AxisEle() {
        var _this = _super.call(this) || this;
        _this.toggleIndividualImgZoomKey = "a";
        _this._mousePos = new point_1.Point();
        _this._dragging = false;
        _this._veil = new div_ele_1.DivEle();
        _this._setupStyle();
        _this._setupVeil();
        _this._setupKeyDownEventListener();
        return _this;
    }
    AxisEle.prototype._setupStyle = function () {
        this.target.classList.add("axis-ele");
    };
    AxisEle.prototype._setupVeil = function () {
        this._setupVeilStyle();
        this._createVeilEventListeners();
        this.addUntrackedChild(this._veil);
    };
    AxisEle.prototype._setupVeilStyle = function () {
        this._veil.target.classList.add("axis-veil-ele");
        this._veil.style.zIndex = "6";
    };
    AxisEle.prototype._createVeilEventListeners = function () {
        var _this = this;
        this._veil.target.addEventListener("mousedown", function (e) { return _this._mouseDown(e); });
        this._veil.target.addEventListener("mouseup", function (e) { return _this._mouseUp(e); });
        this._veil.target.addEventListener("mousemove", function (e) { return _this._mouseMove(e); });
        this._veil.target.addEventListener("mousewheel", function (e) { return _this._mouseWheel(e); });
        this._veil.target.addEventListener("contextmenu", function (e) { return _this._onContextMenu(e); });
    };
    AxisEle.prototype._setupKeyDownEventListener = function () {
        var _this = this;
        window.addEventListener("keydown", function (e) {
            if (e.key === _this.toggleIndividualImgZoomKey) {
                if (_this._veil.style.zIndex === "6") {
                    _this._veil.style.zIndex = "1";
                }
                else {
                    _this._veil.style.zIndex = "6";
                }
            }
        });
    };
    AxisEle.prototype.addDragZoomEle = function (child) {
        _super.prototype.addChild.call(this, child);
    };
    AxisEle.prototype._mouseDown = function (e) {
        this._dragging = true;
        e.preventDefault();
        e.stopPropagation();
    };
    AxisEle.prototype._mouseUp = function (e) {
        this._dragging = false;
        e.preventDefault();
        e.stopPropagation();
    };
    AxisEle.prototype._mouseMove = function (e) {
        var oldMousePos = this._mousePos.copy();
        this._mousePos.updateFromMouseEvent(e);
        if (this._dragging) {
            var delta_1 = this._mousePos.subtract(oldMousePos);
            this.children.forEach(function (child) {
                child.pos.bumpBy(delta_1);
                child.dragger.setPos(child.pos);
            });
        }
        e.preventDefault();
        e.stopPropagation();
    };
    AxisEle.prototype._mouseWheel = function (e) {
        var _this = this;
        var zoom = (e.deltaY < 0) ? 1.1 : 0.9;
        this.children.forEach(function (child) {
            _this._zoomChild(child, zoom);
        });
        e.preventDefault();
        e.stopPropagation();
    };
    AxisEle.prototype._zoomChild = function (child, zoomPercent) {
        var x = this._mousePos.x;
        var y = this._mousePos.y;
        var x1 = child.pos.x;
        var y1 = child.pos.y;
        var x2 = x1 + child.zoomer.size.x;
        var y2 = y1 + child.zoomer.size.y;
        var newX1X2 = zoom1d_1.Zoom1d.zoom(x, x1, x2, zoomPercent);
        //noinspection JSSuspiciousNameCombination
        var newY1Y2 = zoom1d_1.Zoom1d.zoom(y, y1, y2, zoomPercent);
        child.pos.x = newX1X2[0];
        child.pos.y = newY1Y2[0];
        child.dragger.setPos(child.pos);
        child.zoomer.size.x = newX1X2[1] - newX1X2[0];
        child.zoomer.size.y = newY1Y2[1] - newY1Y2[0];
        child.zoomer.setSize(child.zoomer.size);
    };
    //noinspection JSMethodCanBeStatic
    AxisEle.prototype._onContextMenu = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    return AxisEle;
}(div_ele_1.DivEle));
exports.AxisEle = AxisEle;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WebApp = (function () {
    function WebApp() {
        this._children = [];
    }
    WebApp.prototype.addChildren = function (children) {
        var _this = this;
        children.forEach(function (child) { return _this.addChild(child); });
    };
    WebApp.prototype.addChild = function (child) {
        this._children.push(child);
        window.document.body.appendChild(child.target);
    };
    WebApp.prototype.removeChild = function (child) {
        var childIndex = this._children.indexOf(child);
        if (childIndex < 0) {
            throw new Error("Attempted to remove unknown child");
        }
        this._children.splice(childIndex, 1);
        window.document.body.removeChild(child.target);
        child = null;
        console.log("num web app children: " + this._children.length);
    };
    return WebApp;
}());
exports.WebApp = WebApp;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var div_ele_1 = __webpack_require__(6);
var button_ele_1 = __webpack_require__(8);
var text_area_ele_1 = __webpack_require__(16);
var img_drag_zoom_ele_1 = __webpack_require__(9);
var Controls = (function (_super) {
    __extends(Controls, _super);
    function Controls(cookieName, axis, onRemove) {
        var _this = _super.call(this) || this;
        _this.cookieName = cookieName;
        _this.axis = axis;
        _this.onRemove = onRemove;
        _this._textArea = new text_area_ele_1.TextAreaEle();
        _this.target.classList.add("controls");
        _this.style.display = "none";
        _this._textArea.textAreaElement.cols = 100;
        _this._textArea.textAreaElement.rows = 5;
        _this._textArea.text = localStorage[cookieName];
        var textContainer = new div_ele_1.DivEle();
        textContainer.style.padding = "10px";
        textContainer.addChild(_this._textArea);
        var buttonContainer = new div_ele_1.DivEle();
        buttonContainer.style.padding = "10px";
        buttonContainer.addChildren([
            new button_ele_1.ButtonEle("Apply JSON", function () { return _this.applyJSON(); }),
            new button_ele_1.ButtonEle("Save Chagnes", function () { return _this.saveChanges(); })
        ]);
        _this.addChildren([
            textContainer,
            buttonContainer
        ]);
        return _this;
    }
    Controls.prototype.applyJSON = function () {
        var _this = this;
        var newJSON = this._textArea.text;
        if (newJSON.length === 0) {
            newJSON = "[]";
        }
        var models;
        try {
            models = JSON.parse(newJSON);
        }
        catch (e) {
            alert("Failed to parse JSON: " + e);
        }
        // ugly.
        while (this.axis.children.length > 0) {
            this.axis.children[0].removeChild(this.axis.children[0]);
        }
        models.forEach(function (model) {
            var ele = img_drag_zoom_ele_1.ImgDragZoomEle.fromModel(model, _this.onRemove);
            _this.axis.addChild(ele);
        });
    };
    Controls.prototype.saveChanges = function () {
        var models = [];
        this.axis.children.forEach(function (child) {
            models.push(child.toModel());
        });
        // alert(JSON.stringify(models));
        localStorage[this.cookieName] = JSON.stringify(models);
    };
    return Controls;
}(div_ele_1.DivEle));
exports.Controls = Controls;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ele_1 = __webpack_require__(1);
var TextAreaEle = (function (_super) {
    __extends(TextAreaEle, _super);
    function TextAreaEle() {
        var _this = _super.call(this) || this;
        _this.target = document.createElement("textarea");
        return _this;
    }
    Object.defineProperty(TextAreaEle.prototype, "textAreaElement", {
        get: function () { return this.target; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TextAreaEle.prototype, "text", {
        get: function () { return this.textAreaElement.value; },
        set: function (t) {
            this.textAreaElement.value = t;
        },
        enumerable: true,
        configurable: true
    });
    return TextAreaEle;
}(ele_1.Ele));
exports.TextAreaEle = TextAreaEle;


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map