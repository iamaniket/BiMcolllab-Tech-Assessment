import Ajv from 'ajv';
import { ModelSchema } from "../types/schema"

const ajv = new Ajv({ allErrors: true });

export const validateSchema = ajv.compile(ModelSchema);