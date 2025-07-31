
import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { setupLeadsTable } from '../lib/dbSetup';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await setupLeadsTable();
    const { id } = req.query;
    if (Array.isArray(id) || !id) {
        return res.status(400).json({ error: 'A single lead ID is required.' });
    }

    switch (req.method) {
        case 'PUT':
            try {
                const { company, contactName, email, phone, status, source, value } = req.body;
                const result = await sql`
                    UPDATE leads 
                    SET company = ${company}, contact_name = ${contactName}, email = ${email}, phone = ${phone}, status = ${status}, source = ${source}, value = ${value}
                    WHERE id = ${id}
                    RETURNING id, company, contact_name AS "contactName", email, phone, status, source, value;
                `;
                if (result.rowCount === 0) return res.status(404).json({ error: 'Lead not found' });
                return res.status(200).json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        case 'DELETE':
            try {
                const result = await sql`DELETE FROM leads WHERE id = ${id};`;
                if (result.rowCount === 0) return res.status(404).json({ error: 'Lead not found' });
                return res.status(204).send('');
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
