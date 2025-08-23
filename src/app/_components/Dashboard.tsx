"use client";

import React, { useState, useEffect } from "react";
import { signOut } from "@/lib/auth-client";
import {
  Calculator,
  CheckCircle,
  User,
  Mail,
  Calendar,
  ArrowRight,
  BarChart3,
  Heart,
  Activity,
  Zap,
} from "lucide-react";

interface User {
  id?: string;
  email?: string;
  name?: string;
  emailVerified?: boolean;
  // Add other user fields as needed
}

interface DashboardProps {
  user?: User;
  onLogout: () => void;
  onStartCalculator: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  user,
  onLogout,
  onStartCalculator,
}) => {
  const [loading, setLoading] = useState(false);

  // 🔍 DEBUG: Log user prop changes
  useEffect(() => {
    console.log("📊 Dashboard: user prop changed:", {
      user: user ? "exists" : "null",
      userEmail: user?.email,
      userName: user?.name,
      userKeys: user ? Object.keys(user) : [],
      fullUser: user,
    });
  }, [user]);

  // 🔍 DEBUG: Log component renders
  useEffect(() => {
    console.log("📊 Dashboard: Component rendered/re-rendered");
  });

  const handleLogout = async () => {
    console.log("🚪 Dashboard: Logout clicked");
    setLoading(true);
    try {
      await signOut();
      console.log("✅ Dashboard: Logout successful");
      onLogout();
    } catch (error) {
      console.error("❌ Dashboard: Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Calculator className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-xl font-bold text-gray-900">
                WellnessScore
              </span>
            </div>

            {/* 🔍 DEBUG: Add debugging info to nav */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-600">
                    Welcome, {user.name || user.email || "Unknown User"}!
                  </span>
                  <span className="text-xs text-gray-400">
                    (ID: {user.id?.slice(0, 8) || "no-id"})
                  </span>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {loading ? "Signing out..." : "Sign Out"}
                  </button>
                </>
              ) : (
                <div className="text-red-600 text-sm">
                  ⚠️ No user data received
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 🔍 DEBUG: Add user state debugging section */}
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-yellow-800 mb-2">
            🔍 Dashboard Debug Info
          </h3>
          <div className="text-sm space-y-1">
            <div>
              <strong>User prop:</strong> {user ? "✅ EXISTS" : "❌ NULL"}
            </div>
            <div>
              <strong>User email:</strong> {user?.email || "none"}
            </div>
            <div>
              <strong>User name:</strong> {user?.name || "none"}
            </div>
            <div>
              <strong>User ID:</strong> {user?.id || "none"}
            </div>
            <div>
              <strong>User keys:</strong>{" "}
              {user ? Object.keys(user).join(", ") : "none"}
            </div>
            <details className="mt-2">
              <summary className="cursor-pointer text-yellow-700">
                Show Full User Object
              </summary>
              <pre className="bg-white p-2 rounded border mt-1 text-xs overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </details>
          </div>
        </div>

        {/* Rest of dashboard content */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome to Your Health Dashboard!
              </h1>
              <p className="text-blue-100 text-lg">
                Ready to discover your complete health and longevity score?
              </p>
            </div>
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={onStartCalculator}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center group"
            >
              Start Your Health Assessment
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <User className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              Your Profile
            </h2>
          </div>

          {user ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Name
                </label>
                <p className="text-gray-900">{user.name || "Not provided"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email Verified
                </label>
                <p className="text-gray-900">
                  {user.emailVerified ? (
                    <span className="text-green-600 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verified
                    </span>
                  ) : (
                    <span className="text-orange-600">
                      Pending verification
                    </span>
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-red-600">⚠️ User data not available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
