// app/page.tsx - Fixed session state handling
"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import WellnessCalculator from "./_components/WellnessCalculator";
import LandingPage from "./_components/LandingPage";
import RegisterForm from "./_components/auth/RegisterForm";
import Dashboard from "./_components/Dashboard";

type PageState = "landing" | "register" | "calculator" | "dashboard";

function App() {
  const [currentPage, setCurrentPage] = useState<PageState>("landing");
  const { data: session, isPending, error } = useSession();

  // 🔍 DEBUG: Log session state changes
  useEffect(() => {
    console.log("🔍 Session state changed:", {
      session: session ? "exists" : "null",
      isPending,
      error: error?.message,
      currentPage,
      userEmail: session?.user?.email,
    });
  }, [session, isPending, error, currentPage]);

  // Handle session state changes
  useEffect(() => {
    if (isPending) {
      // Still loading, don't make navigation decisions yet
      return;
    }

    if (session) {
      // ✅ User is authenticated
      console.log("✅ User authenticated, current page:", currentPage);

      // Only auto-navigate to dashboard if we're on landing or register
      if (currentPage === "landing" || currentPage === "register") {
        console.log("📝 Auto-navigating to dashboard");
        setCurrentPage("dashboard");
      }
      // If they're on calculator, leave them there
    } else {
      // ❌ No session - user should be on public pages
      console.log("❌ No session, current page:", currentPage);

      // If they're on protected pages, redirect to landing
      if (currentPage === "dashboard" || currentPage === "calculator") {
        console.log("📝 Redirecting to landing (no session)");
        setCurrentPage("landing");
      }
    }
  }, [session, isPending, currentPage]);

  const handleStartAssessment = () => {
    console.log("🚀 Start assessment clicked, session:", !!session);
    if (session) {
      setCurrentPage("calculator");
    } else {
      setCurrentPage("register");
    }
  };

  const handleBackToLanding = () => {
    console.log("🏠 Back to landing clicked");
    setCurrentPage("landing");
  };

  const handleAuthSuccess = () => {
    console.log("✅ Auth success, going to calculator");
    setCurrentPage("calculator");
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

  // Show loading if we're checking session
  if (isPending) {
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
      <div>User: {session?.user?.email || "none"}</div>
      <div>Page: {currentPage}</div>
      <div>Pending: {isPending ? "yes" : "no"}</div>
      {error && <div>Error: {error.message}</div>}
    </div>
  );

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
            if (!session) {
              console.log(
                "⚠️ Calculator accessed without session, redirecting..."
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
                <WellnessCalculator />
              </div>
            );

          case "dashboard":
            // 🔒 Protect dashboard page
            if (!session) {
              console.log(
                "⚠️ Dashboard accessed without session, redirecting..."
              );
              setCurrentPage("landing");
              return null;
            }

            return (
              <Dashboard
                user={session.user}
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
