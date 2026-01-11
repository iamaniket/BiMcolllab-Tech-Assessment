import express, { Express } from 'express';

const port: number = 3000;

const app: Express = express();


app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});