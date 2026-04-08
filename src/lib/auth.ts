// lib/auth.ts
import { betterAuth } from "better-auth";
import { Pool } from "pg";

/** Normalize origin (no trailing slash) for comparisons and Better Auth config. */
function normalizeOrigin(url: string): string {
  return url.replace(/\/$/, "");
}

/** Used for cookie issuance and OAuth callbacks; must match the browser origin in each environment. */
function getAuthBaseURL(): string {
  if (process.env.BETTER_AUTH_URL) {
    return normalizeOrigin(process.env.BETTER_AUTH_URL.trim());
  }
  if (process.env.VERCEL_URL) {
    return normalizeOrigin(`https://${process.env.VERCEL_URL}`);
  }
  return "http://localhost:3000";
}

function getTrustedOrigins(): string[] {
  /* localhost and 127.0.0.1 are different origins — include both for local dev. */
  const defaults = [
    "http://localhost:3000",
    "https://localhost:3000",
    "http://127.0.0.1:3000",
    "https://127.0.0.1:3000",
    "http://[::1]:3000",
    "https://[::1]:3000",
    "https://health-coach-calculator.vercel.app",
  ];
  const fromEnv =
    process.env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",")
      .map((s) => normalizeOrigin(s.trim()))
      .filter(Boolean) ?? [];
  const vercel = process.env.VERCEL_URL
    ? [normalizeOrigin(`https://${process.env.VERCEL_URL}`)]
    : [];

  /**
   * Always allow the same origin as baseURL. Browsers send Origin for the *site* URL
   * (e.g. https://app.healthcoachinc.com), while VERCEL_URL is often only *.vercel.app —
   * without this, email sign-in returns 403 Forbidden in production on a custom domain.
   */
  const baseOrigin = getAuthBaseURL();

  return [...new Set([baseOrigin, ...defaults, ...fromEnv, ...vercel])];
}

export const auth = betterAuth({
  // Database connection to Supabase
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),

  // Secret for encryption and signing
  secret: process.env.BETTER_AUTH_SECRET!,

  baseURL: getAuthBaseURL(),

  trustedOrigins: getTrustedOrigins(),

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

  // When you turn on requireEmailVerification, set sendOnSignUp: true and implement sendVerificationEmail.
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      console.log(`Send verification email to ${user.email}: ${url}`);
    },
    sendOnSignUp: false,
    autoSignInAfterVerification: true,
    expiresIn: 3600,
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
