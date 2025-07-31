import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { setupTicketsTable } from './lib/dbSetup';
import { TicketStatus } from '../../types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await setupTicketsTable();
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const { rows } = await sql`
                SELECT id, title, description, status, type, user_id AS "userId", user_type AS "userType", created_at AS "createdAt"
                FROM tickets ORDER BY id ASC;
            `;
            return res.status(200).json(rows);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    if (req.method === 'POST') {
        try {
            const { title, description, type, userId, userType } = req.body;
            const status = TicketStatus.Open;
            const createdAt = new Date().toISOString().split('T')[0];

            const result = await sql`
                INSERT INTO tickets (title, description, status, type, user_id, user_type, created_at) 
                VALUES (${title}, ${description}, ${status}, ${type}, ${userId}, ${userType}, ${createdAt})
                RETURNING id, title, description, status, type, user_id AS "userId", user_type AS "userType", created_at AS "createdAt";
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
    }
    
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
