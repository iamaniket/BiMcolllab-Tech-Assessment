import { clashChecker } from '../../service/siteCheck/siteCheck.service';
import { IModel } from '../../types/schema';
import { validateSchema } from '../../utility/validate';

export function siteChecker(data: IModel): { status: boolean, issues?: Array<Object> | null | undefined } {

    if (!validateSchema(data)) {
        return {
            status: false,
            issues: validateSchema.errors
        }
    }

    const issues = clashChecker(data);

    return {
        status: true,
        issues: issues
    }
}