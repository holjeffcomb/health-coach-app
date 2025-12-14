"use client";

import React, { useState } from "react";
import { signOut } from "@/lib/auth-client";
import {
  Sparkles,
  BadgeCheck,
  UserCircle,
  ArrowRight,
} from "lucide-react";
import AssessmentsList from "./AssessmentsList";

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

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      onLogout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-300">
      {/* Navigation */}
      <nav className="bg-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-gray-900">
                HALO Wellness
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <span className="text-gray-600">
                    Welcome, {user.name || user.email || "User"}!
                  </span>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {loading ? "Signing out..." : "Sign Out"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        {/* Dashboard content */}
        <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl p-8 mb-8 border border-slate-500">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome to Your Health Dashboard!
              </h1>
              <p className="text-blue-100 text-lg">
                Ready to discover your complete health and longevity score?
              </p>
            </div>
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center backdrop-blur-sm border border-white/30">
              <BadgeCheck className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={onStartCalculator}
              className="bg-slate-400 hover:bg-slate-500 text-slate-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center group"
            >
              Start Your Health Assessment
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="bg-slate-100 rounded-xl shadow-lg p-6 border border-slate-300">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center mr-3">
              <UserCircle className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
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
                      <BadgeCheck className="w-4 h-4 mr-1" strokeWidth={2.5} />
                      Verified
                    </span>
                  ) : (
                    <span className="text-orange-600">
                      Pending verification
                    </span>
                  )}
                </p>
              </div>
              {user?.id && <AssessmentsList userId={user.id} />}
            </div>
          ) : (
            <div className="text-red-600">User data not available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
