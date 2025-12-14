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
  const { data: session, isPending } = useSession();

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

  // -- Persist user when available ------------------------------------------

  useEffect(() => {
    if (session?.user) {
      const normalized = normalizeUser(session.user);
      if (normalized) {
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
      return;
    }

    // Protected pages require a user. If none, send to register.
    if (isProtected(currentPage) && !effectiveUser) {
      setCurrentPage("register");
      return;
    }

    // If authenticated/effective, auto-forward from landing to dashboard.
    if (currentPage === "landing" && effectiveUser) {
      setCurrentPage("dashboard");
      return;
    }

    // If never had a session and we're on a protected page (edge race),
    // we already handled via isProtected() branch above.
  }, [isPending, currentPage, effectiveUser]);

  // -- Handlers --------------------------------------------------------------

  const handleStartAssessment = () => {
    if (effectiveUser) setCurrentPage("calculator");
    else setCurrentPage("register");
  };

  const handleBackToLanding = () => {
    // Explicit logout path: clear everything.
    setCurrentPage("landing");
    setPersistentUser(null);
    setHasEverHadSession(false);
  };

  const handleAuthSuccess = () => {
    setCurrentPage("dashboard");
  };

  const handleGoToCalculator = () => {
    setCurrentPage("calculator");
  };

  const handleBackToDashboard = () => {
    setCurrentPage("dashboard");
  };

  // -- Loading gate (optional optimistic UX if we have a persisted user) -----

  if (isPending && !persistentUser) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-6" />
          <h3 className="text-2xl font-semibold mb-2 text-gray-900">HALO</h3>
          <p className="text-gray-500">Initializing your wellness journey...</p>
        </div>
      </div>
    );
  }

  // -- Render (pure; no state updates here) ----------------------------------

  switch (currentPage) {
    case "register":
      return (
        <RegisterForm
          onSuccess={handleAuthSuccess}
          onBackToLanding={handleBackToLanding}
        />
      );

    case "calculator":
      if (!effectiveUser) {
        // Effect will redirect; render nothing to avoid flicker.
        return null;
      }
      return (
        <div>
          <div className="p-6 bg-white border-b border-calmGray">
            <button
              onClick={handleBackToDashboard}
              className="text-haloBlue hover:text-primary-600 text-sm font-semibold transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
          <WellnessCalculator user={effectiveUser} />
        </div>
      );

    case "dashboard":
      if (!effectiveUser) {
        // Effect will redirect; render nothing to avoid flicker.
        return null;
      }
      return (
        <Dashboard
          user={effectiveUser}
          onLogout={handleBackToLanding}
          onStartCalculator={handleGoToCalculator}
        />
      );

    default: // "landing"
      return (
        <LandingPage
          onStartAssessment={handleStartAssessment}
          onAuthClick={() => setCurrentPage("register")}
        />
      );
  }
}
