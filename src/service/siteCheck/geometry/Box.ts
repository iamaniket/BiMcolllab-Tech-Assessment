import Vector2D from "./Vector2D";

// Base to store geometry of all entittes in JSON as all of them are rects
export default class Box {
    private position: Vector2D;
    private width: number;
    private height: number;

    constructor(position: Vector2D, width: number, height: number) {
        this.position = position;
        this.width = width;
        this.height = height;
    }
}