import { IBuilding } from "../../../types/schema";
import Box from "../geometry/Box"
import Vector2D from "../geometry/Vector2D"

export class Building extends Box {

    public name: string;
    public type: string;

    constructor(data: IBuilding) {
        super(new Vector2D(data.x, data.y), data.width, data.length)
        this.name = data.name;
        this.type = data.type;
    }
}