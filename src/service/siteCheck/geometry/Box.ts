import Vector2D from "./Vector2D";

// Base to store geometry of all entittes
export default class Box {
    public position: Vector2D; // Bottom left 
    public width: number;
    public height: number;

    constructor(position: Vector2D, width: number, height: number) {
        this.position = position;
        this.width = width;
        this.height = height;
    }

    /**
    * Checks if a given point lies inside this box (inclusive edges)
    * 
    * @param point - The point to check
    * @returns true if the point is inside the box, false otherwise
    */
    protected isPointInBox(point: Vector2D): boolean {

        const minX = this.position.x;
        const maxX = this.position.x + this.width;
        const minY = this.position.y;
        const maxY = this.position.y + this.height;

        return point.x >= minX && point.x <= maxX &&
            point.y >= minY && point.y <= maxY;
    }


    /**
    * Returns the four corner points of the box as Vector2D objects.
    * 
    * The order of the points is:
    * 1. Bottom-left
    * 2. Bottom-right
    * 3. Top-right
    * 4. Top-left
    * 
    * @returns {[Vector2D, Vector2D, Vector2D, Vector2D]}  An array containing the four corners of the box.
    */
    public getCornerPoints(): [Vector2D, Vector2D, Vector2D, Vector2D] {
        return [
            new Vector2D(this.position.x, this.position.y),                    // Bottom-left
            new Vector2D(this.position.x + this.width, this.position.y),       // Bottom-right
            new Vector2D(this.position.x + this.width, this.position.y + this.height), // Top-right
            new Vector2D(this.position.x, this.position.y + this.height)       // Top-left
        ];
    }
}