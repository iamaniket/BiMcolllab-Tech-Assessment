import { Router, Request, Response } from 'express';
import { siteChecker } from "./siteCheck.controller"

export const siteCheck = Router();

siteCheck.post('/clash-check', async (req: Request, res: Response) => {
    try {
        const data = req.body ? req.body : {};
        const result = siteChecker(data);

        if (!result.status) {
            res.status(400).json({ status: 'valdation-error', errors: result.errors ? result.errors : ["One or more issues with input JSON"] });
            return;
        }

        res.status(200).json({ status: 'WIP' });
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});
