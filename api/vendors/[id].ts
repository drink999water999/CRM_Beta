
import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { setupVendorsTable } from '../lib/dbSetup';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await setupVendorsTable();
    const { id } = req.query;
    if (Array.isArray(id) || !id) {
        return res.status(400).json({ error: 'A single vendor ID is required.' });
    }

    switch (req.method) {
        case 'PUT':
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

        default:
            res.setHeader('Allow', ['PUT']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
