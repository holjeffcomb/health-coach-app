// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // No baseURL needed if auth server is on the same domain
  // Better Auth will automatically use the current domain
  // Only specify baseURL if your auth server is on a different domain
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
