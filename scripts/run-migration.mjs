#!/usr/bin/env node
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databaseUrl = process.env.POSTGRES_URL;

if (!databaseUrl) {
  console.error('[v0] Error: POSTGRES_URL environment variable not set');
  process.exit(1);
}

const pool = new Pool({
  connectionString: databaseUrl,
});

async function runMigration() {
  const client = await pool.connect();
  
  try {
    console.log('[v0] Connecting to Supabase PostgreSQL...');
    
    const sqlPath = path.join(__dirname, '01-init-db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');
    
    console.log('[v0] Executing migration...');
    
    // Execute the full SQL script
    await client.query(sql);
    
    console.log('[v0] Migration completed successfully!');
    console.log('[v0] Created tables:');
    console.log('  - profiles');
    console.log('  - clients');
    console.log('  - intake_forms');
    console.log('  - programs');
    console.log('  - session_slots');
    console.log('  - session_bookings');
    console.log('  - client_progress');
    console.log('  - trainer_notes');
    console.log('  - videos');
    console.log('  - nutrition_logs');
    console.log('  - blog_posts');
    console.log('  - testimonials');
    console.log('  - email_subscribers');
    console.log('  - email_campaigns');
    console.log('  - referrals');
    console.log('  - whatsapp_messages');
    
  } catch (error) {
    console.error('[v0] Migration error:', error.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();
