import express, { Express } from 'express';
import { siteCheck } from './api/siteCheck/siteCheck.route';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swagger';

const port: number = 3000;

const app: Express = express();


app.use(express.json());


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**
 * @swagger
 * /health:
 *   get:
 *     summary: Allow health check
 *     tags:
 *       - health
 *     responses:
 *       200:
 *         description: Successful response
 */
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});

app.use(siteCheck);