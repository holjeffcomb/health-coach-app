// app/_components/LandingPage.tsx - Updated with auth integration
"use client";

import React, { useState } from "react";
import {
  Calculator,
  RotateCcw,
  Heart,
  Activity,
  Zap,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Users,
  Shield,
  Award,
} from "lucide-react";

// Updated interface to include auth handler
interface LandingPageProps {
  onStartAssessment: () => void;
  onAuthClick?: () => void; // New prop for auth
}

const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onAuthClick,
}) => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation - Updated with working auth button */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Calculator className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-xl font-bold text-gray-900">
                WellnessScore
              </span>
            </div>
            <div className="hidden md:flex space-x-6">
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                About
              </button>
              <button className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                How It Works
              </button>
              <button
                onClick={onAuthClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Login / Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your Complete
                <span className="text-yellow-300 block">
                  Health & Longevity
                </span>
                Assessment
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Get a comprehensive evaluation of your metabolic health, fitness
                level, and longevity potential with our scientifically-backed
                calculator. Make informed decisions about your wellness journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onStartAssessment}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center group"
                >
                  Start Your Assessment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setShowDemo(!showDemo)}
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  {showDemo ? "Hide Demo" : "Watch Demo"}
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-white mb-2">92</div>
                  <div className="text-white text-lg">Health Score</div>
                  <div className="text-green-200 text-sm mt-2">
                    Excellent Range
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Metabolic Health</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-4/5 transition-all duration-1000"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fitness Level</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full w-3/4 transition-all duration-1000 delay-200"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Body Composition</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full w-4/5 transition-all duration-1000 delay-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section (conditionally rendered) */}
      {showDemo && (
        <section className="py-12 bg-blue-50 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                How the Assessment Works
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Input Health Data</h4>
                  <p className="text-sm text-gray-600">
                    Enter your basic info, vital signs, and lifestyle factors
                  </p>
                </div>
                <div className="p-4">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Get Your Score</h4>
                  <p className="text-sm text-gray-600">
                    Receive detailed analysis across multiple health dimensions
                  </p>
                </div>
                <div className="p-4">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Take Action</h4>
                  <p className="text-sm text-gray-600">
                    Get personalized recommendations for improvement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Rest of your existing LandingPage component sections... */}
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Health Assessment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced calculator evaluates multiple aspects of your health
              to provide you with actionable insights and personalized
              recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group hover:bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
              <div className="bg-blue-100 group-hover:bg-blue-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-colors">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Basic Profile
              </h3>
              <p className="text-gray-600">
                Age, gender, and lifestyle factors that influence your health
                baseline.
              </p>
            </div>

            <div className="text-center group hover:bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
              <div className="bg-green-100 group-hover:bg-green-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-colors">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Metabolic Health
              </h3>
              <p className="text-gray-600">
                Blood pressure, glucose levels, and other key metabolic
                indicators.
              </p>
            </div>

            <div className="text-center group hover:bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
              <div className="bg-purple-100 group-hover:bg-purple-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-colors">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fitness Level
              </h3>
              <p className="text-gray-600">
                Exercise habits, cardiovascular fitness, and physical activity
                assessment.
              </p>
            </div>

            <div className="text-center group hover:bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
              <div className="bg-orange-100 group-hover:bg-orange-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-colors">
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Body Composition
              </h3>
              <p className="text-gray-600">
                BMI, body fat percentage, and muscle mass distribution analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Updated with working auth button */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Discover Your Health Score?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Take the first step towards a healthier, longer life with our
            comprehensive assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartAssessment}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center group"
            >
              Start Your Free Assessment
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onAuthClick}
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Sign Up / Login
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            No credit card required • Results in under 5 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Calculator className="w-8 h-8 text-blue-400 mr-3" />
                <span className="text-xl font-bold">WellnessScore</span>
              </div>
              <p className="text-gray-400">
                Empowering you to make informed decisions about your health and
                longevity.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button className="hover:text-white transition-colors">
                    Health Calculator
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Features
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Pricing
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button className="hover:text-white transition-colors">
                    Help Center
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Contact Us
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button className="hover:text-white transition-colors">
                    Newsletter
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Blog
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors">
                    Community
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 WellnessScore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
