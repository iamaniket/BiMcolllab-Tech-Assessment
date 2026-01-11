import { ISite } from "../../../types/schema";
import Box from "../geometry/Box"
import Vector2D from "../geometry/Vector2D"
import { Building } from "./Building";

export class Site extends Box {

    constructor(data: ISite) {
        super(new Vector2D(0, 0), data.width, data.length);
    }


    /**
    * Checks whether a given building is fully contained Site boundaries.
    *
    * @param {Building} building - The building to check
    * @returns {boolean} - Returns true if the building is fully inside this box, false otherwise
    */
    public isBuildingInside(building: Building): boolean {

        const points = building.getCornerPoints();

        for (const point of points) {
            if (!this.isPointInBox(point)) {
                return false;
            }
        };

        return true;
    }

}