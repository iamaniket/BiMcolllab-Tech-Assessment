import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Endpoints',
            version: '1.0.0',
            description: 'API documentation (TypeScript)',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['src/**/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
