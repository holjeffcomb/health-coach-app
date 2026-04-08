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
    <div className="min-h-screen bg-brand-cream">
      <nav className="sticky top-0 z-40 border-b border-brand-charcoal/5 bg-brand-parchment/90 backdrop-blur-md shadow-[0_1px_0_rgba(218,176,83,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-charcoal flex items-center justify-center shadow-md ring-1 ring-brand-gold/35">
                <Sparkles className="w-5 h-5 text-brand-gold" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-display font-semibold text-brand-ink tracking-tight">
                HALO Wellness
              </span>
            </div>

            <div className="flex items-center gap-4">
              {user && (
                <>
                  <span className="text-sm text-brand-body hidden sm:inline">
                    Welcome, {user.name || user.email || "User"}
                  </span>
                  <button
                    onClick={handleLogout}
                    disabled={loading}
                    className="text-sm font-medium text-brand-warm hover:text-brand-ink border border-brand-charcoal/10 hover:border-brand-gold/40 bg-white/80 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? "Signing out…" : "Sign out"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl p-8 mb-8 text-white bg-gradient-to-br from-brand-charcoal via-brand-warm to-[#1a1612] shadow-[0_16px_48px_rgba(22,22,22,0.3)] ring-1 ring-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-20%,rgba(218,176,83,0.25),transparent_50%)] pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="font-display text-3xl font-semibold mb-2 tracking-tight">
                Your health dashboard
              </h1>
              <p className="text-white/85 text-lg leading-snug max-w-xl">
                Run or revisit your assessment anytime—scores save here so you
                can track changes.
              </p>
            </div>
            <div className="bg-white/15 rounded-2xl w-16 h-16 flex items-center justify-center backdrop-blur-sm border border-white/25 shrink-0">
              <BadgeCheck className="w-8 h-8 text-brand-gold" strokeWidth={2.5} />
            </div>
          </div>

          <div className="relative mt-6">
            <button
              onClick={onStartCalculator}
              className="btn-secondary inline-flex items-center gap-2 px-8 py-4 text-base font-semibold !bg-white !text-brand-charcoal !border-white/90 hover:!bg-brand-parchment"
            >
              Start your assessment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center mb-4">
            <div className="w-9 h-9 rounded-xl bg-brand-charcoal flex items-center justify-center mr-3 ring-1 ring-brand-gold/30">
              <UserCircle className="w-5 h-5 text-brand-gold" strokeWidth={2} />
            </div>
            <h2 className="text-xl font-display font-semibold text-brand-ink">
              Your profile
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
