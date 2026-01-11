import { Type, Static } from '@sinclair/typebox';

// Site Width and length should be more than 0 
const SitePlanSchema = Type.Object({
    width: Type.Number({ exclusiveMinimum: 0 }),
    length: Type.Number({ exclusiveMinimum: 0 })
});

// Building Width and length should be more than 0 
// and position is mimimum 0
const BuildingSchema = Type.Object({
    name: Type.String(),
    type: Type.String(),
    length: Type.Number({ exclusiveMinimum: 0 }),
    width: Type.Number({ exclusiveMinimum: 0 }),
    x: Type.Number({ minimum: 0 }),
    y: Type.Number({ minimum: 0 })
});

export const ModelSchema = Type.Object({
    sitePlan: SitePlanSchema,
    buildings: Type.Array(BuildingSchema)
});

export type IModel = Static<typeof ModelSchema>;
export type IBuilding = Static<typeof BuildingSchema>;
export type ISite = Static<typeof SitePlanSchema>;