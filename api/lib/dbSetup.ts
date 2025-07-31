import { sql } from '@vercel/postgres';
import { 
    INITIAL_RETAILERS, 
    INITIAL_VENDORS, 
    INITIAL_TICKETS, 
    INITIAL_PROPOSALS, 
    INITIAL_LEADS, 
    INITIAL_DEALS 
} from '../../constants';
import { UserProfile, Retailer, Vendor, Ticket, Proposal, Lead, Deal } from '../../types';

const INITIAL_USER_PROFILE: UserProfile = {
  id: 1,
  fullName: 'Mohamed Hussein',
  email: 'mohamed@gmail.com',
  phone: '+1234567890'
};

const camelToSnake = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

const createTableAndSeed = async (
    tableName: string, 
    schema: string, 
    initialData: any[],
    seedCheckColumn: string = 'id'
) => {
    try {
        await sql.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${schema});`);
        const result = await sql.query(`SELECT 1 FROM ${tableName} LIMIT 1;`);
        
        if (result.rowCount === 0) {
            console.log(`Seeding ${tableName}...`);
            const columns = Object.keys(initialData[0]).map(camelToSnake);
            for (const item of initialData) {
                const values = Object.values(item);
                const placeholders = values.map((_, i) => `$${i + 1}`).join(',');
                await sql.query(`INSERT INTO ${tableName} (${columns.join(',')}) VALUES (${placeholders});`, values);
            }
        }
    } catch (error) {
        console.error(`Error setting up table ${tableName}:`, error);
        throw error;
    }
};

export const setupRetailersTable = async () => {
    const schema = `
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        account_status VARCHAR(50),
        marketplace_status VARCHAR(50),
        join_date DATE
    `;
    await createTableAndSeed('retailers', schema, INITIAL_RETAILERS, 'id');
};

export const setupVendorsTable = async () => {
    const schema = `
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        business_name VARCHAR(255),
        category VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        account_status VARCHAR(50),
        marketplace_status VARCHAR(50),
        join_date DATE
    `;
    await createTableAndSeed('vendors', schema, INITIAL_VENDORS, 'id');
};

export const setupLeadsTable = async () => {
    const schema = `
        id SERIAL PRIMARY KEY,
        company VARCHAR(255) NOT NULL,
        contact_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        status VARCHAR(50),
        source VARCHAR(255),
        value NUMERIC
    `;
    await createTableAndSeed('leads', schema, INITIAL_LEADS, 'id');
};

export const setupDealsTable = async () => {
    const schema = `
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        contact_name VARCHAR(255) NOT NULL,
        value NUMERIC,
        stage VARCHAR(50),
        probability INTEGER,
        close_date DATE
    `;
    await createTableAndSeed('deals', schema, INITIAL_DEALS, 'id');
};

export const setupProposalsTable = async () => {
    const schema = `
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        client_name VARCHAR(255),
        client_company VARCHAR(255),
        value NUMERIC,
        currency VARCHAR(10),
        status VARCHAR(50),
        valid_until DATE,
        sent_date DATE,
        created_at DATE
    `;
    await createTableAndSeed('proposals', schema, INITIAL_PROPOSALS, 'id');
};

export const setupTicketsTable = async () => {
    const schema = `
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50),
        type VARCHAR(50),
        user_id INTEGER,
        user_type VARCHAR(50),
        created_at DATE
    `;
    await createTableAndSeed('tickets', schema, INITIAL_TICKETS, 'id');
};

export const setupUserProfileTable = async () => {
    const schema = `
        id INTEGER PRIMARY KEY,
        full_name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50)
    `;
    await createTableAndSeed('user_profile', schema, [INITIAL_USER_PROFILE], 'id');
};