// app/page.tsx - Fixed session state handling with persistence
"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "@/lib/auth-client";
import WellnessCalculator from "./_components/WellnessCalculator";
import LandingPage from "./_components/LandingPage";
import RegisterForm from "./_components/auth/RegisterForm";
import Dashboard from "./_components/Dashboard";
import type { User } from "./types/wellness";

type PageState = "landing" | "register" | "calculator" | "dashboard";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageState>("landing");
  const { data: session, isPending, error } = useSession();

  // We persist the user shape expected by WellnessCalculator/Dashboard.
  // If your auth client user shape differs, adjust in normalizeUser().
  const [persistentUser, setPersistentUser] = useState<User | null>(null);
  const [hasEverHadSession, setHasEverHadSession] = useState(false);

  // -- Helpers ---------------------------------------------------------------

  const normalizeUser = (raw: unknown): User | null => {
    // If your session.user shape already matches `User`, you can just cast.
    // Otherwise, map the fields here.
    return (raw as unknown as User) ?? null;
  };

  const effectiveUser: User | null = useMemo(() => {
    const sUser = session?.user ? normalizeUser(session.user) : null;
    return sUser ?? (hasEverHadSession ? persistentUser : null);
  }, [session?.user, hasEverHadSession, persistentUser]);

  const isProtected = (p: PageState) => p === "dashboard" || p === "calculator";

  // -- Debug log -------------------------------------------------------------

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log("🔍 Session state changed:", {
      session: session ? "exists" : "null",
      persistentUser: persistentUser ? "exists" : "null",
      isPending,
      error: error?.message,
      currentPage,
      userEmail: (session?.user as User | undefined)?.email,
      persistentUserEmail: persistentUser?.email,
      hasEverHadSession,
    });
  }, [
    session,
    persistentUser,
    isPending,
    error,
    currentPage,
    hasEverHadSession,
  ]);

  // -- Persist user when available ------------------------------------------

  useEffect(() => {
    if (session?.user) {
      const normalized = normalizeUser(session.user);
      if (normalized) {
        // eslint-disable-next-line no-console
        console.log("💾 Storing user data persistently");
        setPersistentUser(normalized);
        setHasEverHadSession(true);
      }
    }
    // Note: we do NOT auto-clear persistent user on temporary session loss here.
    // We only clear on explicit logout to avoid flicker during brief auth drops.
  }, [session?.user]);

  // -- Navigation rules (no state updates during render) ---------------------

  useEffect(() => {
    if (isPending) {
      // eslint-disable-next-line no-console
      console.log("⏳ Still loading session...");
      return;
    }

    // Protected pages require a user. If none, send to register.
    if (isProtected(currentPage) && !effectiveUser) {
      // eslint-disable-next-line no-console
      console.log("📝 Redirecting to register (no user for protected page)");
      setCurrentPage("register");
      return;
    }

    // If authenticated/effective, auto-forward from landing to dashboard.
    if (currentPage === "landing" && effectiveUser) {
      // eslint-disable-next-line no-console
      console.log("📝 Auto-navigating to dashboard");
      setCurrentPage("dashboard");
      return;
    }

    // If never had a session and we're on a protected page (edge race),
    // we already handled via isProtected() branch above.
  }, [isPending, currentPage, effectiveUser]);

  // -- Handlers --------------------------------------------------------------

  const handleStartAssessment = () => {
    // eslint-disable-next-line no-console
    console.log("🚀 Start assessment clicked, session:", !!session);
    if (effectiveUser) setCurrentPage("calculator");
    else setCurrentPage("register");
  };

  const handleBackToLanding = () => {
    // Explicit logout path: clear everything.
    // eslint-disable-next-line no-console
    console.log("🏠 Back to landing clicked - clearing persistent data");
    setCurrentPage("landing");
    setPersistentUser(null);
    setHasEverHadSession(false);
  };

  const handleAuthSuccess = () => {
    // eslint-disable-next-line no-console
    console.log("✅ Auth success, going to dashboard");
    setCurrentPage("dashboard");
  };

  const handleGoToCalculator = () => {
    // eslint-disable-next-line no-console
    console.log("🧮 Go to calculator clicked");
    setCurrentPage("calculator");
  };

  const handleBackToDashboard = () => {
    // eslint-disable-next-line no-console
    console.log("📊 Back to dashboard clicked");
    setCurrentPage("dashboard");
  };

  // -- Debug overlay ---------------------------------------------------------

  const showDebugInfo = process.env.NODE_ENV === "development";

  const debugOverlay = showDebugInfo && (
    <div className="fixed top-0 right-0 bg-black bg-opacity-80 text-white p-2 text-xs z-50 max-w-xs">
      <div>
        <strong>Debug Info:</strong>
      </div>
      <div>Session: {session ? "✅" : "❌"}</div>
      <div>Persistent: {persistentUser ? "✅" : "❌"}</div>
      <div>
        User:{" "}
        {(session?.user as User | undefined)?.email ||
          persistentUser?.email ||
          "none"}
      </div>
      <div>Page: {currentPage}</div>
      <div>Pending: {isPending ? "yes" : "no"}</div>
      <div>Ever had session: {hasEverHadSession ? "yes" : "no"}</div>
      {error && <div>Error: {error.message}</div>}
    </div>
  );

  // -- Loading gate (optional optimistic UX if we have a persisted user) -----

  if (isPending && !persistentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
          <p>Loading...</p>
          {showDebugInfo && (
            <div className="mt-4 text-sm opacity-75">
              <p>Checking session...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -- Render (pure; no state updates here) ----------------------------------

  switch (currentPage) {
    case "register":
      return (
        <>
          {debugOverlay}
          <RegisterForm
            onSuccess={handleAuthSuccess}
            onBackToLanding={handleBackToLanding}
          />
        </>
      );

    case "calculator":
      if (!effectiveUser) {
        // Effect will redirect; render nothing to avoid flicker.
        return <>{debugOverlay}</>;
      }
      return (
        <>
          {debugOverlay}
          <div>
            <div className="p-4 bg-white border-b">
              <button
                onClick={handleBackToDashboard}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                ← Back to Dashboard
              </button>
            </div>
            <WellnessCalculator user={effectiveUser} />
          </div>
        </>
      );

    case "dashboard":
      if (!effectiveUser) {
        // Effect will redirect; render nothing to avoid flicker.
        return <>{debugOverlay}</>;
      }
      return (
        <>
          {debugOverlay}
          <Dashboard
            user={effectiveUser}
            onLogout={handleBackToLanding}
            onStartCalculator={handleGoToCalculator}
          />
        </>
      );

    default: // "landing"
      return (
        <>
          {debugOverlay}
          <LandingPage
            onStartAssessment={handleStartAssessment}
            onAuthClick={() => setCurrentPage("register")}
          />
        </>
      );
  }
}
