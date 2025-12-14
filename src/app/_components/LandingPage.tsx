// app/_components/LandingPage.tsx - Clean HALO Design
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Activity,
  Gauge,
  TrendingUp,
  ArrowRight,
  UsersRound,
  PlayCircle,
  BadgeCheck,
  Stethoscope,
} from "lucide-react";

interface LandingPageProps {
  onStartAssessment: () => void;
  onAuthClick?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onAuthClick,
}) => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-slate-200">
      {/* Navigation */}
      <nav className="bg-slate-100 sticky top-0 z-50 backdrop-blur-sm bg-slate-100/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                HALO Wellness
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                How It Works
              </Link>
              <button onClick={onAuthClick} className="btn-primary">
                Login / Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Clean & Minimal */}
      <section className="bg-slate-300 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Your Complete
                <span className="text-halo-blue block">Health Assessment</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Get a comprehensive evaluation of your metabolic health, fitness
                level, and longevity potential with our scientifically-backed
                assessment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onStartAssessment}
                  className="btn-primary flex items-center justify-center group text-base px-8 py-4"
                >
                  Start Your Assessment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setShowDemo(!showDemo)}
                  className="btn-secondary flex items-center justify-center text-base px-8 py-4"
                >
                  <PlayCircle className="w-5 h-5 mr-2" strokeWidth={2} />
                  {showDemo ? "Hide Demo" : "Watch Demo"}
                </button>
              </div>
            </div>

            {/* Clean Score Card */}
            <div className="relative">
              <div className="card transform hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-r from-halo-blue to-primary-700 rounded-xl p-8 text-center text-white mb-6">
                  <div className="text-5xl font-bold mb-2">92</div>
                  <div className="text-xl opacity-90">Health Score</div>
                  <div className="text-blue-100 text-sm mt-2">
                    Excellent Range
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      Metabolic Health
                    </span>
                    <div className="w-24 bg-gray-100 rounded-full h-2">
                      <div className="bg-recovery-emerald h-2 rounded-full w-4/5 transition-all duration-1000"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      Fitness Level
                    </span>
                    <div className="w-24 bg-gray-100 rounded-full h-2">
                      <div className="bg-halo-blue h-2 rounded-full w-3/4 transition-all duration-1000 delay-200"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      Body Composition
                    </span>
                    <div className="w-24 bg-gray-100 rounded-full h-2">
                      <div className="bg-vitality-gold h-2 rounded-full w-4/5 transition-all duration-1000 delay-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How the Assessment Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive assessment evaluates four key dimensions of your health using evidence-based metrics and sliding scale scoring.
            </p>
          </div>

          {/* Four Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="card text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Activity className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Basic Info</h3>
              <p className="text-sm text-gray-600">
                Age, gender, and personal information that influence your health baseline
              </p>
            </div>

            <div className="card text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Stethoscope className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Metabolic Health</h3>
              <p className="text-sm text-gray-600">
                Blood pressure, A1c, lipid panel (LDL, HDL, triglycerides, Lp(a), ApoB), and waist-to-height ratio
              </p>
            </div>

            <div className="card text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Gauge className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Fitness Level</h3>
              <p className="text-sm text-gray-600">
                VO2 max (cardiovascular fitness) and grip strength (functional strength)
              </p>
            </div>

            <div className="card text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">4. Body Composition</h3>
              <p className="text-sm text-gray-600">
                Body fat percentage and skeletal muscle mass (age and gender-adjusted)
              </p>
            </div>
          </div>

          {/* Scoring Details */}
          <div className="card">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Evidence-Based Scoring System
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">How Scores Are Calculated</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span><strong>Sliding Scale Scoring:</strong> Uses linear interpolation between thresholds for precise evaluation</span>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span><strong>Weighted Categories:</strong> Metabolic Health (41%), VO2 Max (24%), Grip Strength (12%), Body Composition (24%)</span>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span><strong>Age & Gender Adjusted:</strong> All metrics are normalized for your demographic profile</span>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span><strong>Grade System:</strong> A+ (90+) to F (&lt;50) with clear risk assessments</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Research-Backed Metrics</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span>Based on guidelines from ADA, AHA, NHANES, Cooper Institute, NIH, and ESC/EAS</span>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span>Comprehensive lipid analysis including LDL/Total and HDL/Total ratios</span>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span>Advanced markers like Lp(a) and ApoB for cardiovascular risk assessment</span>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span>Skeletal muscle mass scoring based on European Working Group on Sarcopenia standards</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-slate-100 rounded-lg border border-slate-300">
              <p className="text-sm text-gray-600 text-center">
                <strong>Note:</strong> Results are for informational purposes only and should not replace professional medical advice. 
                The assessment takes approximately 5 minutes to complete.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Health Assessment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced assessment evaluates multiple aspects of your health
              to provide actionable insights and personalized recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="metric-card text-center group">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-200 to-slate-300 group-hover:from-slate-600 group-hover:to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all shadow-md group-hover:shadow-lg transform group-hover:scale-110">
                <UsersRound className="w-7 h-7 text-slate-600 group-hover:text-white transition-colors" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Basic Profile
              </h3>
              <p className="text-gray-600 text-sm">
                Age, gender, and lifestyle factors that influence your health
                baseline.
              </p>
            </div>

            <div className="metric-card metric-emerald text-center group">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-200 to-slate-300 group-hover:from-slate-600 group-hover:to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all shadow-md group-hover:shadow-lg transform group-hover:scale-110">
                <Activity className="w-7 h-7 text-slate-600 group-hover:text-white transition-colors" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Metabolic Health
              </h3>
              <p className="text-gray-600 text-sm">
                Blood pressure, glucose levels, and other key metabolic
                indicators.
              </p>
            </div>

            <div className="metric-card text-center group">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-200 to-slate-300 group-hover:from-slate-600 group-hover:to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all shadow-md group-hover:shadow-lg transform group-hover:scale-110">
                <Gauge className="w-7 h-7 text-slate-600 group-hover:text-white transition-colors" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fitness Level
              </h3>
              <p className="text-gray-600 text-sm">
                Exercise habits, cardiovascular fitness, and physical activity
                assessment.
              </p>
            </div>

            <div className="metric-card metric-gold text-center group">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-200 to-slate-300 group-hover:from-slate-600 group-hover:to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all shadow-md group-hover:shadow-lg transform group-hover:scale-110">
                <TrendingUp className="w-7 h-7 text-slate-600 group-hover:text-white transition-colors" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Body Composition
              </h3>
              <p className="text-gray-600 text-sm">
                BMI, body fat percentage, and muscle mass distribution analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clean CTA Section */}
      <section className="py-20 bg-slate-300">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Discover Your Health Score?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take the first step towards a healthier, longer life with our
            comprehensive assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartAssessment}
              className="btn-primary flex items-center justify-center group text-lg px-8 py-4"
            >
              Start Your Free Assessment
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onAuthClick}
              className="btn-secondary flex items-center justify-center text-lg px-8 py-4"
            >
              Sign Up / Login
            </button>
          </div>
          <div className="flex items-center justify-center mt-6 text-gray-500 text-sm">
            <BadgeCheck className="w-4 h-4 mr-2" strokeWidth={2.5} />
            No credit card required • Results in under 5 minutes
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="bg-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center mr-3 shadow-md">
                  <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  HALO Wellness
                </span>
              </div>
              <p className="text-gray-600">
                Empowering you to make informed decisions about your health and
                longevity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <button className="hover:text-gray-900 transition-colors">
                    Health Assessment
                  </button>
                </li>
                <li>
                  <button className="hover:text-gray-900 transition-colors">
                    Features
                  </button>
                </li>
                <li>
                  <button className="hover:text-gray-900 transition-colors">
                    Pricing
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <button className="hover:text-gray-900 transition-colors">
                    Help Center
                  </button>
                </li>
                <li>
                  <button className="hover:text-gray-900 transition-colors">
                    Contact Us
                  </button>
                </li>
                <li>
                  <button className="hover:text-gray-900 transition-colors">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <button className="hover:text-gray-900 transition-colors">
                    Newsletter
                  </button>
                </li>
                <li>
                  <button className="hover:text-gray-900 transition-colors">
                    Blog
                  </button>
                </li>
                <li>
                  <button className="hover:text-gray-900 transition-colors">
                    Community
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2025 HALO Wellness. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
