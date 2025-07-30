
import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { setupLeadsTable } from './lib/dbSetup';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await setupLeadsTable();

    switch (req.method) {
        case 'GET':
            try {
                const { rows } = await sql`
                    SELECT id, company, contact_name AS "contactName", email, phone, status, source, value 
                    FROM leads;
                `;
                return res.status(200).json(rows);
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        case 'POST':
            try {
                const { company, contactName, email, phone, status, source, value } = req.body;
                const result = await sql`
                    INSERT INTO leads (company, contact_name, email, phone, status, source, value) 
                    VALUES (${company}, ${contactName}, ${email}, ${phone}, ${status}, ${source}, ${value})
                    RETURNING id, company, contact_name AS "contactName", email, phone, status, source, value;
                `;
                return res.status(201).json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        case 'PUT':
            try {
                const { id, company, contactName, email, phone, status, source, value } = req.body;
                if (!id) return res.status(400).json({ error: 'ID is required for update' });
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
                const { id } = req.body;
                if (!id) return res.status(400).json({ error: 'ID is required for deletion' });
                const result = await sql`DELETE FROM leads WHERE id = ${id};`;
                if (result.rowCount === 0) return res.status(404).json({ error: 'Lead not found' });
                return res.status(204).send('');
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}