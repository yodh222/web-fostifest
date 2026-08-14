import postgres from 'postgres';
import * as dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL);

async function main() {
  try {
    console.log("Setting up Supabase Storage RLS policies...");
    
    // Create bucket if it doesn't exist
    await sql`
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('fostifest-files', 'fostifest-files', true)
      ON CONFLICT (id) DO UPDATE SET public = true;
    `;
    console.log("Bucket fostifest-files ensured to exist and is public.");

    // Drop existing policies if any to avoid conflicts
    await sql`DROP POLICY IF EXISTS "Allow public insert" ON storage.objects;`.catch(() => {});
    await sql`DROP POLICY IF EXISTS "Allow public select" ON storage.objects;`.catch(() => {});
    await sql`DROP POLICY IF EXISTS "Allow public update" ON storage.objects;`.catch(() => {});

    // Allow insert
    await sql`
      CREATE POLICY "Allow public insert" 
      ON storage.objects FOR INSERT 
      WITH CHECK (bucket_id = 'fostifest-files');
    `;

    // Allow select
    await sql`
      CREATE POLICY "Allow public select" 
      ON storage.objects FOR SELECT 
      USING (bucket_id = 'fostifest-files');
    `;

    // Allow update
    await sql`
      CREATE POLICY "Allow public update" 
      ON storage.objects FOR UPDATE 
      USING (bucket_id = 'fostifest-files');
    `;

    console.log("Success! RLS policies for storage configured.");
  } catch (error) {
    console.error("Error setting up RLS:", error);
  } finally {
    await sql.end();
  }
}

main();
