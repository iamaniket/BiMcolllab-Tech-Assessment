import { Isssue } from "../../types/issues";
import { IModel } from "./../../types/schema"
import { Building } from "./models/Building";
import { Site } from "./models/Site";

/**
 * Performs business and zoning rule checks for a site model.
 * 
 * This function converts the raw model data into domain objects (Site and Buildings),
 * and then applies all general business rules suchOverlap detection between buildings
 *   - Clearance rules
 *   - Site boundary containment
 * 
 * @param {IModel} modelData - The input site model containing sitePlan and building data.
 * @returns {Array<Issue>} - A list of issues found
 */
export function checker(modelData: IModel): Array<Isssue> {

    const site = new Site(modelData.sitePlan);
    const buildings: Array<Building> = [];

    modelData.buildings.forEach((building) => {
        buildings.push(new Building(building));
    })

    return [...generalBusinessRuleCheck(site, buildings), ...zoningBusinessRuleCheck(buildings)];
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
                        description: "Building " + buildingObj.name + " and " + otherBuildongObj.name + " has " + distance + " units between them, they must have " + minBuildingDist + " units"
                    });
                }
            }
        })
    });

    return issues;
}



function zoningBusinessRuleCheck(buildings: Array<Building>): Array<Isssue> {


    const issues: Array<Isssue> = [];
    const issueType = "Zoning business rules"
    const clubScoolminDist = 200;
    const residentialClubStadiumDist = 150;

    const nighClubs = buildings.filter(building => building.type == "Nightclub");
    const schools = buildings.filter(building => building.type == "School");
    const residentialBuilding = buildings.filter(building => building.type == "ResidentialBuilding");
    const stadiums = buildings.filter(building => building.type == "Stadium");


    nighClubs.forEach(club => {
        schools.forEach(school => {
            const distance = club.distanceToBuilding(school);

            if (distance < clubScoolminDist) {
                issues.push(
                    {
                        type: issueType,
                        entites: [club.name, school.name],
                        description: "Nightclub " + club.name + " and School " + school.name + " are at " + distance + " units from each other they must be at least " + clubScoolminDist + " units away."
                    }
                )
            }
        })
    });

    residentialBuilding.forEach(rBuilding => {

        stadiums.forEach(stadium => {

            const distance = rBuilding.distanceToBuilding(stadium);

            if (distance < residentialClubStadiumDist) {
                issues.push(
                    {
                        type: issueType,
                        entites: [rBuilding.name, stadium.name],
                        description: "ResidentialBuilding " + rBuilding.name + " and stadium " + stadium.name + " are at " + distance + " units from each other they must be at least " + residentialClubStadiumDist + " units away."
                    }
                )
            }
        });

        nighClubs.forEach(club => {

            const distance = rBuilding.distanceToBuilding(club);

            if (distance < residentialClubStadiumDist) {
                issues.push(
                    {
                        type: issueType,
                        entites: [rBuilding.name, club.name],
                        description: "ResidentialBuilding " + rBuilding.name + " and club " + club.name + " are at " + distance + " units from each other they must be at least " + residentialClubStadiumDist + " units away."
                    }
                )
            }

        });
    })

    return issues;
}