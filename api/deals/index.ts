
import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { setupDealsTable } from '../lib/dbSetup';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await setupDealsTable();

    switch (req.method) {
        case 'GET':
            try {
                const { rows } = await sql`
                    SELECT id, title, company, contact_name AS "contactName", value, stage, probability, close_date AS "closeDate" 
                    FROM deals ORDER BY id ASC;
                `;
                return res.status(200).json(rows);
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        case 'POST':
            try {
                const { title, company, contactName, value, stage, probability, closeDate } = req.body;
                const result = await sql`
                    INSERT INTO deals (title, company, contact_name, value, stage, probability, close_date) 
                    VALUES (${title}, ${company}, ${contactName}, ${value}, ${stage}, ${probability}, ${closeDate})
                    RETURNING id, title, company, contact_name AS "contactName", value, stage, probability, close_date AS "closeDate";
                `;
                return res.status(201).json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
