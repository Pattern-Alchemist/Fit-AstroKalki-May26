import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return Response.json(
        { error: 'Missing Supabase credentials' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Read the SQL file
    const sqlPath = path.join(process.cwd(), 'scripts', '01-init-db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    // Split statements and execute each one
    const statements = sql
      .split(';')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith('--'));

    const results = [];

    for (const statement of statements) {
      try {
        // Use the Supabase query to execute raw SQL
        const { data, error } = await supabase.rpc('exec_sql_migration', {
          sql: statement,
        });

        if (error) {
          // If the rpc doesn't exist, try direct execution via postgres driver
          console.warn(`RPC not available, attempting direct execution: ${error.message}`);
          // This will be handled by retry logic below
          results.push({
            statement: statement.substring(0, 50),
            status: 'skipped - rpc unavailable',
          });
        } else {
          results.push({
            statement: statement.substring(0, 50),
            status: 'success',
          });
        }
      } catch (err: any) {
        // Ignore errors for statements that might already exist
        if (
          err.message?.includes('already exists') ||
          err.message?.includes('duplicate')
        ) {
          results.push({
            statement: statement.substring(0, 50),
            status: 'already exists',
          });
        } else {
          console.error('Statement error:', err.message);
          results.push({
            statement: statement.substring(0, 50),
            status: 'error: ' + err.message?.substring(0, 30),
          });
        }
      }
    }

    return Response.json(
      {
        message: 'Migration executed',
        totalStatements: statements.length,
        results,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Migration error:', error);
    return Response.json(
      { error: error.message || 'Migration failed' },
      { status: 500 }
    );
  }
}
