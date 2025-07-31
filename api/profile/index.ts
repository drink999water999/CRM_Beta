
import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { setupUserProfileTable } from '../lib/dbSetup';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    await setupUserProfileTable();
    const PROFILE_ID = 1; // The app uses a single profile with a fixed ID

    if (req.method === 'GET') {
        try {
            const { rows } = await sql`
                SELECT id, full_name AS "fullName", email, phone 
                FROM user_profile WHERE id = ${PROFILE_ID};
            `;
            if (rows.length === 0) return res.status(404).json({ error: 'Profile not found' });
            return res.status(200).json(rows[0]);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    if (req.method === 'PUT') {
        const { fullName, email, phone } = req.body;
        try {
            const result = await sql`
                UPDATE user_profile 
                SET full_name = ${fullName}, email = ${email}, phone = ${phone}
                WHERE id = ${PROFILE_ID}
                RETURNING id, full_name AS "fullName", email, phone;
            `;
            if (result.rowCount === 0) {
                 // If the profile doesn't exist, create it (upsert behavior)
                const newProfile = await sql`
                    INSERT INTO user_profile (id, full_name, email, phone) 
                    VALUES (${PROFILE_ID}, ${fullName}, ${email}, ${phone})
                    RETURNING id, full_name AS "fullName", email, phone;
                `;
                return res.status(200).json(newProfile.rows[0]);
            }
            return res.status(200).json(result.rows[0]);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
    
    res.setHeader('Allow', ['GET', 'PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
