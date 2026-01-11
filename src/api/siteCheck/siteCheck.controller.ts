import { validateSchema } from '../../utility/validate';

export function siteChecker(data: unknown): { status: boolean, errors?: Array<Object> | null | undefined } {

    if (!validateSchema(data)) {
        return {
            status: false,
            errors: validateSchema.errors
        }
    }

    // WIP
    return {
        status: true
    }
}