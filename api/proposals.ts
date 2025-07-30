
import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { setupProposalsTable } from './lib/dbSetup';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await setupProposalsTable();

    switch (req.method) {
        case 'GET':
            try {
                const { rows } = await sql`
                    SELECT id, title, client_name AS "clientName", client_company AS "clientCompany", value, currency, status, valid_until AS "validUntil", sent_date AS "sentDate", created_at AS "createdAt"
                    FROM proposals;
                `;
                return res.status(200).json(rows);
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        case 'POST':
            try {
                const { title, clientName, clientCompany, value, currency, status, validUntil } = req.body;
                const sentDate = new Date().toISOString().split('T')[0];
                const createdAt = new Date().toISOString().split('T')[0];
                const result = await sql`
                    INSERT INTO proposals (title, client_name, client_company, value, currency, status, valid_until, sent_date, created_at) 
                    VALUES (${title}, ${clientName}, ${clientCompany}, ${value}, ${currency}, ${status}, ${validUntil}, ${sentDate}, ${createdAt})
                    RETURNING id, title, client_name AS "clientName", client_company AS "clientCompany", value, currency, status, valid_until AS "validUntil", sent_date AS "sentDate", created_at AS "createdAt";
                `;
                return res.status(201).json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        case 'PUT':
            try {
                const { id, title, clientName, clientCompany, value, currency, status, validUntil, sentDate, createdAt } = req.body;
                if (!id) return res.status(400).json({ error: 'ID is required for update' });
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
                const { id } = req.body;
                if (!id) return res.status(400).json({ error: 'ID is required for deletion' });
                const result = await sql`DELETE FROM proposals WHERE id = ${id};`;
                if (result.rowCount === 0) return res.status(404).json({ error: 'Proposal not found' });
                return res.status(204).send('');
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}