
export class Point {
    constructor(public x: number = 0, public y: number = 0) {}

    updateFromMouseEvent(e: MouseEvent): void {
        this.x = e.clientX;
        this.y = e.clientY;
    }

    copy(): Point {
        return new Point(this.x, this.y);
    }

    bumpBy(other): void {
        this.x = this.x + other.x;
        this.y = this.y + other.y;
    }

    add(other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y);
    }

    subtract(other: Point): Point {
        return new Point(this.x - other.x, this.y - other.y);
    }

    toModel(): Point {
        return this.copy();
    }
}

export class PointAverager {
    get average(): Point {
        let xSum = 0;
        let ySum = 0;

        this._averageBuffer.forEach((point: Point) => {
            xSum += point.x;
            ySum += point.y;
        });

        if (this._averageBuffer.length === 0) {
            return new Point();
        } else {
            return new Point(
                xSum / this._averageBuffer.length, 
                ySum / this._averageBuffer.length);
        }
    }

    push(p: Point) {
        this._averageBuffer.push(p.copy());
        if (this._averageBuffer.length > this._averageBufferSize) {
            this._averageBuffer.splice(0, 1);
        }
    }

    clear() {
        this._averageBuffer = [];
    }

    private _averageBuffer: Array<Point> = [];
    private _averageBufferSize = 10;
}