import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { setupVendorsTable } from './lib/dbSetup';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await setupVendorsTable();
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const { rows } = await sql`
                SELECT id, name, business_name AS "businessName", category, email, phone, account_status AS "accountStatus", marketplace_status AS "marketplaceStatus", join_date AS "joinDate" 
                FROM vendors ORDER BY id ASC;
            `;
            return res.status(200).json(rows);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    if (req.method === 'POST') {
        try {
            const { name, businessName, category, email, phone, accountStatus, marketplaceStatus } = req.body;
            const joinDate = new Date().toISOString().split('T')[0];
            const result = await sql`
                INSERT INTO vendors (name, business_name, category, email, phone, account_status, marketplace_status, join_date) 
                VALUES (${name}, ${businessName}, ${category}, ${email}, ${phone}, ${accountStatus}, ${marketplaceStatus}, ${joinDate})
                RETURNING id, name, business_name AS "businessName", category, email, phone, account_status AS "accountStatus", marketplace_status AS "marketplaceStatus", join_date AS "joinDate";
            `;
            return res.status(201).json(result.rows[0]);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: 'An ID is required for this method.' });
    }

    if (req.method === 'PUT') {
        try {
            const { name, businessName, category, email, phone, accountStatus, marketplaceStatus, joinDate } = req.body;
            const result = await sql`
                UPDATE vendors 
                SET name = ${name}, business_name = ${businessName}, category = ${category}, email = ${email}, phone = ${phone}, account_status = ${accountStatus}, marketplace_status = ${marketplaceStatus}, join_date = ${joinDate}
                WHERE id = ${id}
                RETURNING id, name, business_name AS "businessName", category, email, phone, account_status AS "accountStatus", marketplace_status AS "marketplaceStatus", join_date AS "joinDate";
            `;
            if (result.rowCount === 0) return res.status(404).json({ error: 'Vendor not found' });
            return res.status(200).json(result.rows[0]);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
