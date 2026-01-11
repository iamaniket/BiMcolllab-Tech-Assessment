import { checker } from '../../service/siteCheck/siteCheck.service';
import { IModel } from '../../types/schema';
import { validateSchema } from '../../utility/validate';


/**
 * Checks validity of data and then for valid data it checks the required rules for building and zones.
 * @param data 
 * @returns { status: boolean, issues?: Array<Object> | null | undefined } status with issues or error in model
 */
export function siteChecker(modelData: IModel): { status: boolean, issues?: Array<Object> | null | undefined } {

    if (!validateSchema(modelData)) {
        return {
            status: false,
            issues: validateSchema.errors
        }
    }

    const issues = checker(modelData);

    return {
        status: true,
        issues: issues
    }
}