import { Isssue } from "../../types/issues";
import { IModel } from "./../../types/schema"
import { Building } from "./models/Building";
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
    const issueType = "General business rules";
    const minBuildingDist = 10;

    buildings.forEach((buildingObj, i) => {

        // Check if building is inside the site
        if (!site.isBuildingInside(buildingObj)) {
            issues.push({
                type: issueType,
                entites: ["Site", buildingObj.name],
                description: "Building " + buildingObj.name + " is not positioned fully within the boundaries of the site plan"
            });
        }

        // Check if building can overlap with each other.
        buildings.forEach((otherBuildongObj, j) => {

            // Check if building A overlaps with building B
            if (j <= i) { // it will avoid repetition
                return;
            }

            const isOverlapping = buildingObj.isOverlappingBuilding(otherBuildongObj)

            if (isOverlapping) {
                issues.push({
                    type: issueType,
                    entites: [buildingObj.name, otherBuildongObj.name],
                    description: "Building " + buildingObj.name + " and " + otherBuildongObj.name + "are overlaping each other"
                });
            }
            else {
                const distance = buildingObj.distanceToBuilding(otherBuildongObj);

                // General
                if (distance < minBuildingDist) {
                    issues.push({
                        type: issueType,
                         entites: [buildingObj.name, otherBuildongObj.name],
                        description: "Building " + buildingObj.name + " and " + otherBuildongObj.name + " has " + distance + " units beween tham, they must have " + minBuildingDist + " units"
                    });
                }
            }
        })
    });

    return issues;
}



function zoningBusinessRuleCheck(site: Site, buildings: Array<Building>): Array<Isssue> {

    return [];
}