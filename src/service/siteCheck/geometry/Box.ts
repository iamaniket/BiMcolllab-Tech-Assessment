import Vector2D from "./Vector2D";

// Base to store geometry of all entittes
export default class Box {
    public position: Vector2D; // Bottom left 
    public width: number;
    public height: number;

    protected min: Vector2D;
    protected max: Vector2D;


    constructor(position: Vector2D, width: number, height: number) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.min = new Vector2D(this.position.x, this.position.y);
        this.max = new Vector2D(this.position.x + this.width, this.position.y + this.height);
    }

    /**
     * Checks if a given point lies inside this box (inclusive edges)
     * 
     * @param point - The point to check
     * @returns true if the point is inside the box, false otherwise
     */
    protected isPointInBox(point: Vector2D): boolean {

        return point.x >= this.min.x && point.x <= this.max.x &&
            point.y >= this.min.y && point.y <= this.max.y;
    }

    /**
     * Checks if boxes are collding or not
     * @param other box to check with
     * @returns {boolean} true if overallping is present
     */
    protected isOverlapping(other: Box): boolean {
        return !(
            this.position.x + this.width <= other.position.x ||
            other.position.x + other.width <= this.position.x ||
            this.position.y + this.height <= other.position.y ||
            other.position.y + other.height <= this.position.y
        );
    }

    /**
     * Calculates distance between 2 boxes
     * @param other box to check with
     * @returns 
     */
    protected distanceToBox(other: Box): number {
        const dx = Math.max(this.min.x - other.max.x, other.min.x - this.max.x, 0);
        const dy = Math.max(this.min.y - other.max.y, other.min.y - this.max.y, 0);
        return Math.sqrt((dx * dx) + (dy * dy));
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