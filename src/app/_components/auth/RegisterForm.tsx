// app/_components/auth/RegisterForm.tsx - Clean HALO Design
"use client";

import React, { useState } from "react";
import {
  signUp,
  signIn,
  mapBetterAuthUserToAppUser,
} from "@/lib/auth-client";
import type { User } from "@/app/types/wellness";
import {
  User as UserIcon,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Calculator,
  ArrowLeft,
} from "lucide-react";

interface RegisterFormProps {
  /** Called with the signed-in user immediately so the app can route before /session catches up. */
  onSuccess?: (user: User) => void;
  onBackToLanding?: () => void;
  /** Which form to show first when this screen opens (e.g. Sign in from landing vs Start assessment). */
  initialView?: "login" | "signup";
}

/** Better Auth `code` when present (e.g. INVALID_EMAIL_OR_PASSWORD) */
function errorCodeFromAuth(err: unknown): string | null {
  if (!err || typeof err !== "object") {
    return null;
  }
  const o = err as Record<string, unknown>;
  if (typeof o.code === "string") {
    return o.code;
  }
  const nested = o.error;
  if (nested && typeof nested === "object" && "code" in nested) {
    const c = (nested as Record<string, unknown>).code;
    return typeof c === "string" ? c : null;
  }
  return null;
}

/** Human-readable message from Better Auth / better-fetch payloads */
function messageFromAuthFailure(err: unknown): string | null {
  if (!err || typeof err !== "object") {
    return null;
  }
  const o = err as Record<string, unknown>;
  if (typeof o.message === "string" && o.message.trim()) {
    return o.message;
  }
  const nested = o.error;
  if (nested && typeof nested === "object") {
    const e = nested as Record<string, unknown>;
    if (typeof e.message === "string" && e.message.trim()) {
      return e.message;
    }
    if (typeof e.code === "string" && e.code.trim()) {
      return e.code.replace(/_/g, " ");
    }
  }
  return null;
}

function extractUserFromAuthResult(result: unknown): unknown {
  if (!result || typeof result !== "object") {
    return null;
  }
  const r = result as Record<string, unknown>;
  if ("error" in r && r.error) {
    return null;
  }
  if ("data" in r && r.data && typeof r.data === "object") {
    const d = r.data as Record<string, unknown>;
    if ("user" in d) {
      return d.user;
    }
  }
  if ("user" in r) {
    return r.user;
  }
  return null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onBackToLanding,
  initialView = "signup",
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLogin, setIsLogin] = useState(initialView === "login");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user types
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return false;
    }

    if (!isLogin) {
      if (!formData.firstName || !formData.lastName) {
        setError("First and last name are required");
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      let result;

      if (isLogin) {
        result = await signIn.email({
          email: formData.email,
          password: formData.password,
        });
      } else {
        result = await signUp.email({
          email: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`,
        });
      }

      if ("error" in result && result.error) {
        const r = result as { error: unknown };
        const code = errorCodeFromAuth(r.error);
        const msg =
          messageFromAuthFailure(r.error) ||
          (typeof r.error === "object" &&
          r.error !== null &&
          "statusText" in r.error &&
          typeof (r.error as { statusText?: string }).statusText === "string"
            ? (r.error as { statusText: string }).statusText
            : null);
        let text =
          msg ||
          (isLogin
            ? "Sign-in failed. Check your email and password, or create an account first."
            : "Could not create account. See details below or try another email.");
        if (isLogin && code === "INVALID_EMAIL_OR_PASSWORD") {
          text =
            "That email and password don’t match our records. If you haven’t signed up yet, use “Sign up” below. If you have, check spelling, caps lock, and that you’re using the same email as when you registered.";
        }
        setError(text);
        return;
      }

      const rawUser = extractUserFromAuthResult(result);
      const appUser = mapBetterAuthUserToAppUser(rawUser);
      if (appUser) {
        setSuccess(true);
        onSuccess?.(appUser);
        return;
      }

      setError("Authentication response unclear. Please try again.");
    } catch (err: unknown) {
      const picked = messageFromAuthFailure(err);
      let errorMessage =
        picked ||
        `${isLogin ? "Login" : "Registration"} failed — check the browser Network tab response body for details.`;

      if (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof (err as { message?: string }).message === "string"
      ) {
        const m = (err as { message: string }).message;
        if (m.includes("Invalid") || m.includes("password")) {
          errorMessage = "Invalid email or password";
        } else if (m && !picked) {
          errorMessage = m;
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Back to Landing */}
        {onBackToLanding && (
          <button
            onClick={onBackToLanding}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </button>
        )}

        {/* Main Form Card */}
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-brand-charcoal rounded-xl flex items-center justify-center mr-3 ring-1 ring-brand-gold/35 shadow-md">
                <Calculator className="w-7 h-7 text-brand-gold" />
              </div>
              <span className="text-2xl font-semibold text-gray-900">
                HALO Wellness
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-600">
              {isLogin
                ? "Sign in to access your health dashboard"
                : "Join thousands improving their health"}
            </p>
          </div>

          {/* Success State */}
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center mb-6">
              <div className="w-12 h-12 bg-recovery-emerald rounded-full flex items-center justify-center mx-auto mb-3">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-emerald-900 mb-1">Success!</h3>
              <p className="text-emerald-700 text-sm">
                {isLogin
                  ? "Signing you in..."
                  : "Account created successfully!"}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name fields (only for registration) */}
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-field pl-10 pr-4 py-3"
                    required={!isLogin}
                  />
                </div>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input-field pl-10 pr-4 py-3"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="input-field pl-10 pr-4 py-3"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input-field pl-10 pr-12 py-3"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Confirm Password (only for registration) */}
            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-10 pr-12 py-3"
                  required={!isLogin}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="btn-primary w-full py-4 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="loading-spinner" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Toggle between login/register */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-gray-600 text-sm">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                    setSuccess(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    });
                  }}
                  className="text-halo-blue hover:text-primary-600 font-medium transition-colors"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Additional Help */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Need help?{" "}
            <button className="text-halo-blue hover:text-primary-600 transition-colors">
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
