import { Isssue } from "../../types/issues";
import { IModel } from "./../../types/schema"
import { Building } from "./models/building";
import { Site } from "./models/Site";

export function clashChecker(modelData: IModel): Array<Isssue> {

    const site = new Site(modelData.sitePlan);
    const buildings: Array<Building> = [];

    modelData.buildings.forEach((building) => {
        buildings.push(new Building(building));
    })

    // WIP Check clash is present or not

    return [];
}