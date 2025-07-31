
import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { setupRetailersTable } from '../lib/dbSetup';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await setupRetailersTable();
    const { id } = req.query;
    if (Array.isArray(id) || !id) {
        return res.status(400).json({ error: 'A single retailer ID is required.' });
    }

    switch (req.method) {
        case 'PUT':
            try {
                const { name, company, email, phone, accountStatus, marketplaceStatus, joinDate } = req.body;
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
            res.setHeader('Allow', ['PUT']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
