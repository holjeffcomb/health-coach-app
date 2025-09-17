// app/_components/LandingPage.tsx - Clean HALO Design
"use client";

import React, { useState } from "react";
import {
  Calculator,
  Heart,
  Activity,
  BarChart3,
  ArrowRight,
  Users,
  Play,
  Check,
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-halo-blue rounded-lg flex items-center justify-center mr-3">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                HALO Wellness
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                About
              </button>
              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                How It Works
              </button>
              <button onClick={onAuthClick} className="btn-primary">
                Login / Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Clean & Minimal */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
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
                  <Play className="w-4 h-4 mr-2" />
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

      {/* Demo Section */}
      {showDemo && (
        <section className="py-16 bg-gray-50 border-y border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                How the Assessment Works
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-halo-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-semibold">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Input Health Data
                  </h4>
                  <p className="text-gray-600">
                    Enter your basic info, vital signs, and lifestyle factors
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-halo-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-semibold">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Get Your Score
                  </h4>
                  <p className="text-gray-600">
                    Receive detailed analysis across multiple health dimensions
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-halo-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-semibold">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Take Action
                  </h4>
                  <p className="text-gray-600">
                    Get personalized recommendations for improvement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-white">
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
              <div className="w-12 h-12 bg-gray-100 group-hover:bg-halo-blue rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                <Users className="w-6 h-6 text-gray-600 group-hover:text-white" />
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
              <div className="w-12 h-12 bg-emerald-50 group-hover:bg-recovery-emerald rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                <Heart className="w-6 h-6 text-recovery-emerald group-hover:text-white" />
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
              <div className="w-12 h-12 bg-blue-50 group-hover:bg-halo-blue rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                <Activity className="w-6 h-6 text-halo-blue group-hover:text-white" />
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
              <div className="w-12 h-12 bg-yellow-50 group-hover:bg-vitality-gold rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                <BarChart3 className="w-6 h-6 text-vitality-gold group-hover:text-white" />
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
      <section className="py-20 bg-gray-50">
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
            <Check className="w-4 h-4 mr-2" />
            No credit card required • Results in under 5 minutes
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-halo-blue rounded-lg flex items-center justify-center mr-3">
                  <Calculator className="w-5 h-5 text-white" />
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
