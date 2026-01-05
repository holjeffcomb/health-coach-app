// Test script to verify database connection
// Usage: DATABASE_URL="your-connection-string" node test-db-connection.js
// Or: node test-db-connection.js (will read from .env.local if you have dotenv installed)

const { Pool } = require('pg');

// Try to load .env.local if dotenv is available
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  // dotenv not installed, that's okay
}

const connectionString = process.env.DATABASE_URL;

console.log('Testing database connection...');
console.log('Connection string (masked):', connectionString?.replace(/:[^:@]+@/, ':****@'));

if (!connectionString) {
  console.error('❌ DATABASE_URL not found in environment variables');
  console.log('Make sure you have .env.local file with DATABASE_URL set');
  process.exit(1);
}

// Parse the URL to check format
try {
  const url = new URL(connectionString);
  console.log('✓ Connection string format is valid');
  console.log('  Hostname:', url.hostname);
  console.log('  Port:', url.port || '5432 (default)');
  console.log('  Database:', url.pathname.slice(1));
} catch (error) {
  console.error('❌ Invalid connection string format:', error.message);
  process.exit(1);
}

const pool = new Pool({
  connectionString: connectionString,
});

pool.query('SELECT NOW() as current_time, version() as version')
  .then((result) => {
    console.log('✅ Database connection successful!');
    console.log('  Current time:', result.rows[0].current_time);
    console.log('  PostgreSQL version:', result.rows[0].version.split(' ')[0] + ' ' + result.rows[0].version.split(' ')[1]);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Database connection failed:');
    console.error('  Error code:', error.code);
    console.error('  Error message:', error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.error('\n🔍 DNS Resolution Error - Possible causes:');
      console.error('  1. The Supabase project might be paused or deleted');
      console.error('  2. The hostname might be incorrect');
      console.error('  3. Check your Supabase dashboard: https://supabase.com/dashboard');
      console.error('  4. Verify the project reference in the connection string matches your project');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n🔍 Connection Refused - Possible causes:');
      console.error('  1. Wrong port number (should be 5432 for direct, 6543 for pooling)');
      console.error('  2. Firewall blocking the connection');
    } else if (error.code === '28P01') {
      console.error('\n🔍 Authentication Failed - Possible causes:');
      console.error('  1. Wrong password');
      console.error('  2. Password contains special characters that need URL encoding');
      console.error('  3. Try resetting your database password in Supabase');
    }
    
    process.exit(1);
  })
  .finally(() => {
    pool.end();
  });

