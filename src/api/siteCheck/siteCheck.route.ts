import { Router, Request, Response } from 'express';
import { siteChecker } from "./siteCheck.controller"

export const siteCheck = Router();


/**
 * @swagger
 * /site-check:
 *   post:
 *     summary: Check site plan for building clashes Zoning and genral rules for positions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sitePlan:
 *                 type: object
 *                 properties:
 *                   width:
 *                     type: number
 *                     example: 1000
 *                   length:
 *                     type: number
 *                     example: 500
 *               buildings:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Oakwood Academy"
 *                     type:
 *                       type: string
 *                       example: "School"
 *                     width:
 *                       type: number
 *                       example: 300
 *                     length:
 *                       type: number
 *                       example: 300
 *                     x:
 *                       type: number
 *                       example: 0
 *                     y:
 *                       type: number
 *                       example: 0
 *     responses:
 *       200:
 *         description: Returns validation results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hasIssues:
 *                   type: boolean
 *                   example: true
 *                 issues:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Oakwood Academy overlaps with Willow Residence"]
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
siteCheck.post('/site-check', async (req: Request, res: Response) => {
    try {
        const data = req.body ? req.body : {};
        const result = siteChecker(data);

        if (!result.status) {
            res.status(400).json({ status: 'valdation-error', errors: result.issues ? result.issues : ["One or more issues with input JSON"] });
            return;
        }

        const hasIssues = result.issues && result.issues.length > 0;

        res.status(200).json({ hasIssues: hasIssues, issues: hasIssues ? result.issues : [] });
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});
