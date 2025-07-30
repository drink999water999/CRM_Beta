
import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { setupRetailersTable } from './lib/dbSetup';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await setupRetailersTable();

    switch (req.method) {
        case 'GET':
            try {
                const { rows } = await sql`
                    SELECT id, name, company, email, phone, account_status AS "accountStatus", marketplace_status AS "marketplaceStatus", join_date AS "joinDate" 
                    FROM retailers;
                `;
                return res.status(200).json(rows);
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        case 'POST':
            try {
                const { name, company, email, phone, accountStatus, marketplaceStatus } = req.body;
                const joinDate = new Date().toISOString().split('T')[0];
                const result = await sql`
                    INSERT INTO retailers (name, company, email, phone, account_status, marketplace_status, join_date) 
                    VALUES (${name}, ${company}, ${email}, ${phone}, ${accountStatus}, ${marketplaceStatus}, ${joinDate})
                    RETURNING id, name, company, email, phone, account_status AS "accountStatus", marketplace_status AS "marketplaceStatus", join_date AS "joinDate";
                `;
                return res.status(201).json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        case 'PUT':
            try {
                const { id, name, company, email, phone, accountStatus, marketplaceStatus, joinDate } = req.body;
                if (!id) return res.status(400).json({ error: 'ID is required for update' });
                const result = await sql`
                    UPDATE retailers 
                    SET name = ${name}, company = ${company}, email = ${email}, phone = ${phone}, account_status = ${accountStatus}, marketplace_status = ${marketplaceStatus}, join_date = ${joinDate}
                    WHERE id = ${id}
                    RETURNING id, name, company, email, phone, account_status AS "accountStatus", marketplace_status AS "marketplaceStatus", join_date AS "joinDate";
                `;
                if (result.rowCount === 0) return res.status(404).json({ error: 'Retailer not found' });
                return res.status(200).json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}