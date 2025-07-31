
import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { setupDealsTable } from '../lib/dbSetup';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await setupDealsTable();
    const { id } = req.query;
    if (Array.isArray(id) || !id) {
        return res.status(400).json({ error: 'A single deal ID is required.' });
    }

    switch (req.method) {
        case 'PUT':
            try {
                const { title, company, contactName, value, stage, probability, closeDate } = req.body;
                const result = await sql`
                    UPDATE deals 
                    SET title = ${title}, company = ${company}, contact_name = ${contactName}, value = ${value}, stage = ${stage}, probability = ${probability}, close_date = ${closeDate}
                    WHERE id = ${id}
                    RETURNING id, title, company, contact_name AS "contactName", value, stage, probability, close_date AS "closeDate";
                `;
                if (result.rowCount === 0) return res.status(404).json({ error: 'Deal not found' });
                return res.status(200).json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        case 'DELETE':
            try {
                const result = await sql`DELETE FROM deals WHERE id = ${id};`;
                if (result.rowCount === 0) return res.status(404).json({ error: 'Deal not found' });
                return res.status(204).send('');
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
