import { ISite } from "../../../types/schema";
import Box from "../geometry/Box"
import Vector2D from "../geometry/Vector2D"

// Class to hold Site
export class Site extends Box {

    constructor(data: ISite) {
        super(new Vector2D(0, 0), data.width, data.length);
    }

}