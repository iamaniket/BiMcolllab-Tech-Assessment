import { Router, Request, Response } from 'express';

export const validate = Router();

validate.post('/clash-check', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        console.log(data);
        res.status(200).json({ status: 'WIP' });
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});
