import { Isssue } from "../../types/issues";
import { IModel } from "./../../types/schema"
import { Building } from "./models/building";
import { Site } from "./models/Site";

/**
 * Performs clash and business and zoning rule checks for a site model.
 * 
 * This function converts the raw model data into domain objects (Site and Buildings),
 * and then applies all general business rules suchOverlap detection between buildings
 *   - Clearance rules
 *   - Site boundary containment
 * 
 * @param {IModel} modelData - The input site model containing sitePlan and building data.
 * @returns {Array<Issue>} - A list of issues found
 */
export function clashChecker(modelData: IModel): Array<Isssue> {

    const site = new Site(modelData.sitePlan);
    const buildings: Array<Building> = [];

    modelData.buildings.forEach((building) => {
        buildings.push(new Building(building));
    })

    return [...generalBusinessRuleCheck(site, buildings)];
}


function generalBusinessRuleCheck(site: Site, buildings: Array<Building>): Array<Isssue> {

    const issues: Array<Isssue> = [];
    const issueType = "General business rules"

    buildings.forEach((buildingObj, i) => {

        // Check if building is inside the site
        if (!site.isBuildingInside(buildingObj)) {
            issues.push({
                type: issueType,
                entites: ["Site", buildingObj.name],
                description: "Building " + buildingObj.name + " is not positioned fully within the boundaries of the site plan"
            });
        }
    });

    return issues;
}



function zoningBusinessRuleCheck(site: Site, buildings: Array<Building>): Array<Isssue> {

    return [];
}