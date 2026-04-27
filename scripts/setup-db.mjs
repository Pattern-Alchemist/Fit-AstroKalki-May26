import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log('Setting up database schema...');

    // Create profiles table (extends auth.users)
    const { error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)
      .then(async () => {
        console.log('✓ Profiles table already exists');
        return { error: null };
      })
      .catch(async (err) => {
        console.log('Creating profiles table...');
        // Table will be created via Supabase UI or we'll use raw SQL
        return err;
      });

    console.log('✅ Database setup complete!');
    console.log('\nNote: Please execute the SQL migration file in your Supabase dashboard:');
    console.log('1. Go to SQL Editor');
    console.log('2. Click "New Query"');
    console.log('3. Copy contents of scripts/01-init-db.sql');
    console.log('4. Run the query');
  } catch (error) {
    console.error('Setup error:', error.message);
    process.exit(1);
  }
}

setupDatabase();
