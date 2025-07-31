
import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { setupTicketsTable } from '../lib/dbSetup';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await setupTicketsTable();
    const { id } = req.query;
    if (Array.isArray(id) || !id) {
        return res.status(400).json({ error: 'A single ticket ID is required.' });
    }

    switch (req.method) {
        case 'PUT':
            try {
                const { title, description, status, type, userId, userType, createdAt } = req.body;
                const result = await sql`
                    UPDATE tickets 
                    SET title = ${title}, description = ${description}, status = ${status}, type = ${type}, user_id = ${userId}, user_type = ${userType}, created_at = ${createdAt}
                    WHERE id = ${id}
                    RETURNING id, title, description, status, type, user_id AS "userId", user_type AS "userType", created_at AS "createdAt";
                `;
                if (result.rowCount === 0) return res.status(404).json({ error: 'Ticket not found' });
                return res.status(200).json(result.rows[0]);
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }

        default:
            res.setHeader('Allow', ['PUT']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
