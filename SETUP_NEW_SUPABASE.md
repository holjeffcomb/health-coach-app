# Setting Up a New Supabase Project

This guide walks you through what needs to be changed/configured when starting with a new Supabase project.

## ✅ What You DON'T Need to Change

Good news! Your codebase is already configured to use environment variables, so **no code changes are required**. The following files are already set up correctly:

- ✅ `src/lib/auth.ts` - Uses `process.env.DATABASE_URL`
- ✅ `src/app/api/assessments/route.ts` - Uses `process.env.DATABASE_URL`
- ✅ All other code files - No hardcoded Supabase URLs

## 🔧 What You DO Need to Configure

### 1. Environment Variables

You need to set up these environment variables for your new Supabase project:

#### Required Variables:

```bash
# Supabase Database Connection String
# Get this from: Supabase Dashboard → Project Settings → Database → Connection String
# Use the "Connection pooling" URI (recommended) or "Direct connection" URI
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# Better Auth Secret (for encryption and signing)
# Generate a random secret: openssl rand -base64 32
BETTER_AUTH_SECRET=your-random-secret-here

# Optional: Better Auth Base URL (defaults to http://localhost:3000)
# Only needed if your auth server is on a different domain
BETTER_AUTH_URL=http://localhost:3000
```

#### For Production (Vercel/other hosting):

Set these same variables in your hosting platform's environment variables section.

### 2. Create `.env.local` File

Create a `.env.local` file in your project root (it's already in `.gitignore`):

```bash
# .env.local
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
BETTER_AUTH_SECRET=your-random-secret-here
BETTER_AUTH_URL=http://localhost:3000
```

### 3. Set Up Supabase Database Schema

1. Go to your new Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase_schema.sql`
4. Run the script
5. Verify tables are created in **Table Editor**

The schema includes:
- Better Auth tables (`user`, `session`, `account`, `verification`)
- Your application table (`wellness_assessments`)
- All necessary indexes

### 4. Generate BETTER_AUTH_SECRET

Run this command to generate a secure random secret:

```bash
openssl rand -base64 32
```

Or use an online generator, but make sure it's at least 32 characters long.

## 📋 Step-by-Step Checklist

- [ ] Create new Supabase project at https://supabase.com
- [ ] Get your database connection string from Project Settings → Database
- [ ] Generate a new `BETTER_AUTH_SECRET` using `openssl rand -base64 32`
- [ ] Create `.env.local` file with the three environment variables
- [ ] Run the `supabase_schema.sql` script in Supabase SQL Editor
- [ ] Verify tables are created (check Table Editor)
- [ ] Test locally: `npm run dev`
- [ ] If deploying, add environment variables to your hosting platform (Vercel, etc.)

## 🔍 How to Get Your Supabase Connection String

1. Go to your Supabase project dashboard
2. Click **Project Settings** (gear icon)
3. Go to **Database** section
4. Scroll to **Connection string**
5. Choose **Connection pooling** (recommended for serverless) or **Direct connection**
6. Copy the URI - it looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
7. Replace `[YOUR-PASSWORD]` with your actual database password

## 🚨 Important Notes

### Connection Pooling vs Direct Connection

- **Connection Pooling** (recommended): Better for serverless environments like Vercel
  - URI format: `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:6543/postgres`
  - Port: `6543`
  - Use this for production/serverless

- **Direct Connection**: For local development or long-lived connections
  - URI format: `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres`
  - Port: `5432`
  - Use this for local development

### Database Password

If you don't know your database password:
1. Go to Project Settings → Database
2. Click **Reset Database Password**
3. Save the new password securely
4. Update your `DATABASE_URL` with the new password

### Production Deployment

When deploying to Vercel or other platforms:

1. Add environment variables in your hosting platform's dashboard
2. Use **Connection Pooling** URI for `DATABASE_URL`
3. Make sure `BETTER_AUTH_URL` matches your production domain
4. Update `trustedOrigins` in `src/lib/auth.ts` if needed (line 25-30)

## 🧪 Testing Your Setup

After configuration, test that everything works:

1. Start your dev server: `npm run dev`
2. Check console logs - you should see "DB URL check: true" (from auth.ts)
3. Try registering a new user
4. Try creating a wellness assessment
5. Check Supabase Table Editor to verify data is being saved

## 🆘 Troubleshooting

### "Database connection failed"
- Check that `DATABASE_URL` is correct
- Verify password is correct (no special characters need URL encoding)
- Make sure you're using the right connection type (pooling vs direct)

### "BETTER_AUTH_SECRET is required"
- Make sure `.env.local` exists and has `BETTER_AUTH_SECRET` set
- Restart your dev server after adding environment variables

### "Table does not exist"
- Make sure you ran the `supabase_schema.sql` script
- Check Table Editor in Supabase to verify tables exist

### "Unauthorized" errors
- Check that Better Auth tables are created correctly
- Verify session table has proper foreign key to user table

