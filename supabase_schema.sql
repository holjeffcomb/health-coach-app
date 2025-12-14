-- Supabase Backend Schema Recreation
-- Generated from codebase analysis
-- Run this SQL in your Supabase SQL Editor to recreate the database schema

-- ============================================================================
-- Better Auth Tables (from better-auth_migrations)
-- ============================================================================

-- User table
CREATE TABLE IF NOT EXISTS "user" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "emailVerified" BOOLEAN NOT NULL,
  "image" TEXT,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "firstName" TEXT,
  "lastName" TEXT,
  "avatar" TEXT
);

-- Session table
CREATE TABLE IF NOT EXISTS "session" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "expiresAt" TIMESTAMP NOT NULL,
  "token" TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "userId" TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE
);

-- Account table (for authentication providers)
CREATE TABLE IF NOT EXISTS "account" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "accountId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "userId" TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  "accessToken" TEXT,
  "refreshToken" TEXT,
  "idToken" TEXT,
  "accessTokenExpiresAt" TIMESTAMP,
  "refreshTokenExpiresAt" TIMESTAMP,
  "scope" TEXT,
  "password" TEXT,
  "createdAt" TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL
);

-- Verification table (for email verification, password reset, etc.)
CREATE TABLE IF NOT EXISTS "verification" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "identifier" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "expiresAt" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- Application Tables
-- ============================================================================

-- Wellness Assessments table
-- Based on src/app/api/assessments/route.ts and src/app/types/wellness.ts
CREATE TABLE IF NOT EXISTS wellness_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  title TEXT NOT NULL,
  form_data JSONB NOT NULL,
  scores JSONB NOT NULL,
  grade JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ============================================================================
-- Indexes for Performance
-- ============================================================================

-- Indexes for user lookups
CREATE INDEX IF NOT EXISTS idx_user_email ON "user" ("email");
CREATE INDEX IF NOT EXISTS idx_session_user_id ON "session" ("userId");
CREATE INDEX IF NOT EXISTS idx_session_token ON "session" ("token");
CREATE INDEX IF NOT EXISTS idx_account_user_id ON "account" ("userId");
CREATE INDEX IF NOT EXISTS idx_verification_identifier ON "verification" ("identifier");

-- Indexes for wellness assessments
CREATE INDEX IF NOT EXISTS idx_wellness_assessments_user_id ON wellness_assessments ("user_id");
CREATE INDEX IF NOT EXISTS idx_wellness_assessments_created_at ON wellness_assessments ("created_at");

-- ============================================================================
-- Row Level Security (RLS) Policies (if needed)
-- ============================================================================

-- Enable RLS on wellness_assessments if you want Supabase to handle security
-- ALTER TABLE wellness_assessments ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own assessments
-- CREATE POLICY "Users can view own assessments"
--   ON wellness_assessments FOR SELECT
--   USING (auth.uid()::text = user_id);

-- Policy: Users can only insert their own assessments
-- CREATE POLICY "Users can insert own assessments"
--   ON wellness_assessments FOR INSERT
--   WITH CHECK (auth.uid()::text = user_id);

-- Policy: Users can only update their own assessments
-- CREATE POLICY "Users can update own assessments"
--   ON wellness_assessments FOR UPDATE
--   USING (auth.uid()::text = user_id);

-- Policy: Users can only delete their own assessments
-- CREATE POLICY "Users can delete own assessments"
--   ON wellness_assessments FOR DELETE
--   USING (auth.uid()::text = user_id);

-- ============================================================================
-- Notes
-- ============================================================================
-- 
-- 1. The Better Auth tables use TEXT for IDs, which is compatible with
--    Better Auth's ID generation strategy.
--
-- 2. The wellness_assessments table uses UUID for the id field, which is
--    standard for Supabase. If your app expects TEXT IDs, change to TEXT.
--
-- 3. form_data, scores, and grade are stored as JSONB for efficient querying
--    and storage in PostgreSQL/Supabase.
--
-- 4. RLS policies are commented out by default. Uncomment and adjust if you
--    want Supabase to handle row-level security (though Better Auth handles
--    auth in your app, so RLS may not be necessary).
--
-- 5. To run this:
--    - Go to your Supabase Dashboard
--    - Navigate to SQL Editor
--    - Paste and run this entire script
--    - Verify tables are created in the Table Editor

