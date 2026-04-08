// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import type { User } from "@/app/types/wellness";

/** Map Better Auth session/API user payloads into the app's User type (handles ISO date strings). */
export function mapBetterAuthUserToAppUser(raw: unknown): User | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const r = raw as Record<string, unknown>;
  if (typeof r.id !== "string" || typeof r.email !== "string") {
    return null;
  }
  const parseDate = (v: unknown): Date => {
    if (v instanceof Date) {
      return v;
    }
    if (typeof v === "string" || typeof v === "number") {
      const d = new Date(v);
      return Number.isNaN(d.getTime()) ? new Date() : d;
    }
    return new Date();
  };
  return {
    id: r.id,
    email: r.email,
    emailVerified: Boolean(r.emailVerified),
    name: typeof r.name === "string" ? r.name : "",
    createdAt: parseDate(r.createdAt),
    updatedAt: parseDate(r.updatedAt),
    image: typeof r.image === "string" ? r.image : undefined,
  };
}

export const authClient = createAuthClient({
  /* Must match the browser origin (localhost vs 127.0.0.1 vs production). */
  baseURL:
    typeof window !== "undefined" ? window.location.origin : undefined,
  fetchOptions: {
    credentials: "include",
  },
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  updateUser,
  changePassword,
  resetPassword,
  forgetPassword,
} = authClient;
