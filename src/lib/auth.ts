// lib/auth.ts
import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  // Database connection to Supabase
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),

  // Secret for encryption and signing
  secret: process.env.BETTER_AUTH_SECRET!,

  // Base URL for your app
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  // 🔧 ADD THIS: Fix the CORS issue
  trustedOrigins: [
    "http://localhost:3000", // ← ADD THIS LINE (what you're using)
    "https://localhost:3000", // ← ADD THIS LINE (for future HTTPS)
    // Add your production domain later:
    "https://health-coach-calculator.vercel.app",
  ],

  // Enable email and password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true if you want email verification
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true, // Auto sign in after registration
  },

  // 🔧 OPTIONAL: Comment out social providers for now (to remove warnings)
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID!,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  //   },
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //   },
  // },

  // Optional: Email verification (if enabled)
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      console.log(`Send verification email to ${user.email}: ${url}`);
      // Implement your email sending logic here
      // You can use services like Resend, SendGrid, etc.
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },

  // User configuration
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: false,
      },
      lastName: {
        type: "string",
        required: false,
      },
      avatar: {
        type: "string",
        required: false,
      },
    },
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
});
