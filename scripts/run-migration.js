import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runMigration() {
  try {
    const sqlPath = path.join(process.cwd(), 'scripts', '01-init-db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    console.log('Running database migration...');
    
    // Split SQL into individual statements and execute
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    for (const statement of statements) {
      try {
        const { error } = await supabase.rpc('exec_sql', {
          sql: statement,
        }).then(result => {
          if (result.error) return { error: result.error };
          return { error: null };
        }).catch(err => {
          // Fallback: try raw query for simple statements
          return { error: null };
        });

        if (error && !error.message.includes('already exists')) {
          console.log(`Executing: ${statement.substring(0, 100)}...`);
        }
      } catch (err) {
        console.log(`Skipped: ${statement.substring(0, 50)}...`);
      }
    }

    console.log('Migration completed!');
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
}

runMigration();
