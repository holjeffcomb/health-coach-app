// app/page.tsx - Fixed session state handling with persistence
"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import WellnessCalculator from "./_components/WellnessCalculator";
import LandingPage from "./_components/LandingPage";
import RegisterForm from "./_components/auth/RegisterForm";
import Dashboard from "./_components/Dashboard";
import { User } from "./types/wellness";

type PageState = "landing" | "register" | "calculator" | "dashboard";

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>("landing");
  const { data: session, isPending, error } = useSession();
  const [persistentUser, setPersistentUser] = useState<User | null>(null);
  const [hasEverHadSession, setHasEverHadSession] = useState(false);

  // 🔍 DEBUG: Log session state changes
  useEffect(() => {
    console.log("🔍 Session state changed:", {
      session: session ? "exists" : "null",
      persistentUser: persistentUser ? "exists" : "null",
      isPending,
      error: error?.message,
      currentPage,
      userEmail: session?.user?.email,
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

  // 🔧 FIX: Manage persistent user state
  useEffect(() => {
    if (session?.user) {
      console.log("💾 Storing user data persistently");
      setPersistentUser(session.user);
      setHasEverHadSession(true);
    } else if (!isPending && hasEverHadSession && !session) {
      // Only clear persistent user if we're not loading AND we definitely don't have a session
      console.log("🗑️ Session definitely lost, clearing persistent user");
      setPersistentUser(null);
      setHasEverHadSession(false);
    }
  }, [session, isPending, hasEverHadSession]);

  // Handle session state changes
  useEffect(() => {
    if (isPending) {
      // Still loading, don't make navigation decisions yet
      console.log("⏳ Still loading session...");
      return;
    }

    // Use either current session or persistent user data
    const effectiveUser =
      session?.user || (hasEverHadSession ? persistentUser : null);

    if (effectiveUser) {
      // ✅ User is authenticated (or we have persistent data)
      console.log(
        "✅ User authenticated (effective), current page:",
        currentPage
      );

      // Only auto-navigate to dashboard if we're on landing
      if (currentPage === "landing") {
        console.log("📝 Auto-navigating to dashboard");
        setCurrentPage("dashboard");
      }
    } else if (!session && !hasEverHadSession) {
      // ❌ Definitely no session and never had one
      console.log(
        "❌ No session and never had one, current page:",
        currentPage
      );

      // If they're on protected pages, redirect to landing
      if (currentPage === "dashboard" || currentPage === "calculator") {
        console.log("📝 Redirecting to landing (no session)");
        setCurrentPage("landing");
      }
    }
    // If we had a session but temporarily lost it, keep user on current page
  }, [session, isPending, currentPage, persistentUser, hasEverHadSession]);

  const handleStartAssessment = () => {
    console.log("🚀 Start assessment clicked, session:", !!session);
    const effectiveUser = session?.user || persistentUser;
    if (effectiveUser) {
      setCurrentPage("calculator");
    } else {
      setCurrentPage("register");
    }
  };

  const handleBackToLanding = () => {
    console.log("🏠 Back to landing clicked - clearing persistent data");
    setCurrentPage("landing");
    setPersistentUser(null);
    setHasEverHadSession(false);
  };

  const handleAuthSuccess = () => {
    console.log("✅ Auth success, going to dashboard");
    setCurrentPage("dashboard");
  };

  const handleGoToCalculator = () => {
    console.log("🧮 Go to calculator clicked");
    setCurrentPage("calculator");
  };

  const handleBackToDashboard = () => {
    console.log("📊 Back to dashboard clicked");
    setCurrentPage("dashboard");
  };

  // 🔍 DEBUG: Show session info in development
  const showDebugInfo = process.env.NODE_ENV === "development";

  // Show loading if we're checking session AND we don't have persistent data
  if (isPending && !persistentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
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

  // 🔍 DEBUG: Add debug info overlay in development
  const debugOverlay = showDebugInfo && (
    <div className="fixed top-0 right-0 bg-black bg-opacity-80 text-white p-2 text-xs z-50 max-w-xs">
      <div>
        <strong>Debug Info:</strong>
      </div>
      <div>Session: {session ? "✅" : "❌"}</div>
      <div>Persistent: {persistentUser ? "✅" : "❌"}</div>
      <div>User: {session?.user?.email || persistentUser?.email || "none"}</div>
      <div>Page: {currentPage}</div>
      <div>Pending: {isPending ? "yes" : "no"}</div>
      <div>Ever had session: {hasEverHadSession ? "yes" : "no"}</div>
      {error && <div>Error: {error.message}</div>}
    </div>
  );

  // Get effective user for rendering
  const effectiveUser = session?.user || persistentUser;

  // Render based on current page state
  return (
    <>
      {debugOverlay}
      {(() => {
        switch (currentPage) {
          case "register":
            return (
              <RegisterForm
                onSuccess={handleAuthSuccess}
                onBackToLanding={handleBackToLanding}
              />
            );

          case "calculator":
            // 🔒 Protect calculator page
            if (!effectiveUser) {
              console.log(
                "⚠️ Calculator accessed without user, redirecting..."
              );
              setCurrentPage("register");
              return null;
            }

            return (
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
            );

          case "dashboard":
            // 🔒 Protect dashboard page
            if (!effectiveUser) {
              console.log("⚠️ Dashboard accessed without user, redirecting...");
              setCurrentPage("landing");
              return null;
            }

            return (
              <Dashboard
                user={effectiveUser}
                onLogout={handleBackToLanding}
                onStartCalculator={handleGoToCalculator}
              />
            );

          default: // 'landing'
            return (
              <LandingPage
                onStartAssessment={handleStartAssessment}
                onAuthClick={() => setCurrentPage("register")}
              />
            );
        }
      })()}
    </>
  );
}

export default App;
