export class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    updateFromMouseEvent(e) {
        this.x = e.clientX;
        this.y = e.clientY;
    }
    copy() {
        return new Point(this.x, this.y);
    }
    bumpBy(other) {
        this.x = this.x + other.x;
        this.y = this.y + other.y;
    }
    add(other) {
        return new Point(this.x + other.x, this.y + other.y);
    }
    subtract(other) {
        return new Point(this.x - other.x, this.y - other.y);
    }
    toModel() {
        return this.copy();
    }
}
export class PointAverager {
    constructor() {
        this._averageBuffer = [];
        this._averageBufferSize = 10;
    }
    get average() {
        let xSum = 0;
        let ySum = 0;
        this._averageBuffer.forEach((point) => {
            xSum += point.x;
            ySum += point.y;
        });
        if (this._averageBuffer.length === 0) {
            return new Point();
        }
        else {
            return new Point(xSum / this._averageBuffer.length, ySum / this._averageBuffer.length);
        }
    }
    push(p) {
        this._averageBuffer.push(p.copy());
        if (this._averageBuffer.length > this._averageBufferSize) {
            this._averageBuffer.splice(0, 1);
        }
    }
    clear() {
        this._averageBuffer = [];
    }
}
//# sourceMappingURL=point.js.map