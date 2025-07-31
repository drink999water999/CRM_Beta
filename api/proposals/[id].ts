
import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { setupProposalsTable } from '../lib/dbSetup';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await setupProposalsTable();
    const { id } = req.query;
    if (Array.isArray(id) || !id) {
        return res.status(400).json({ error: 'A single proposal ID is required.' });
    }

    switch (req.method) {
        case 'PUT':
            try {
                const { title, clientName, clientCompany, value, currency, status, validUntil, sentDate, createdAt } = req.body;
                const result = await sql`
                    UPDATE proposals 
                    SET title = ${title}, client_name = ${clientName}, client_company = ${clientCompany}, value = ${value}, currency = ${currency}, status = ${status}, valid_until = ${validUntil}, sent_date = ${sentDate}, created_at = ${createdAt}
                    WHERE id = ${id}
                    RETURNING id, title, client_name AS "clientName", client_company AS "clientCompany", value, currency, status, valid_until AS "validUntil", sent_date AS "sentDate", created_at AS "createdAt";
                `;
                if (result.rowCount === 0) return res.status(404).json({ error: 'Proposal not found' });
                return res.status(200).json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        case 'DELETE':
            try {
                const result = await sql`DELETE FROM proposals WHERE id = ${id};`;
                if (result.rowCount === 0) return res.status(404).json({ error: 'Proposal not found' });
                return res.status(204).send('');
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
