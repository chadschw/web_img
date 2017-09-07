
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