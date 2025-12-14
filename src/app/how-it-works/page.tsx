// app/how-it-works/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  Activity,
  Stethoscope,
  Gauge,
  TrendingUp,
  BadgeCheck,
  ArrowLeft,
  Sparkles,
  Scale,
  Heart,
  Dumbbell,
} from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-200">
      {/* Navigation */}
      <nav className="bg-slate-100 sticky top-0 z-50 backdrop-blur-sm bg-slate-100/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center mr-3 shadow-md">
                <Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                HALO Wellness
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-slate-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            How the HALO Assessment Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive, evidence-based evaluation of your health and longevity potential
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview */}
        <section className="mb-16">
          <div className="card">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Assessment Overview
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              The HALO Wellness Assessment evaluates four critical dimensions of your health
              using scientifically validated metrics and age-gender adjusted scoring. The entire
              process takes approximately 5 minutes and provides actionable insights into your
              metabolic health, cardiovascular fitness, functional strength, and body composition.
            </p>
            <p className="text-lg text-gray-700">
              Your final score combines all four categories using evidence-based weighting to
              provide a comprehensive view of your health and longevity potential.
            </p>
          </div>
        </section>

        {/* Four Steps Detail */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            The Four Assessment Steps
          </h2>
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="card">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Activity className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">Step 1: Basic Information</h3>
                    <span className="text-sm font-semibold text-slate-600 bg-slate-200 px-3 py-1 rounded-full">
                      Required
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    We start with fundamental demographic information that forms the baseline
                    for all subsequent calculations.
                  </p>
                  <div className="bg-slate-100 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Metrics Collected:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                        <span><strong>Age:</strong> Used to adjust all scoring thresholds and ranges</span>
                      </li>
                      <li className="flex items-start">
                        <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                        <span><strong>Gender:</strong> Enables gender-specific scoring for VO2 max, grip strength, body fat, and skeletal muscle mass</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="card">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Stethoscope className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">Step 2: Metabolic Health</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Evaluates cardiovascular and metabolic risk factors using comprehensive lipid analysis and vital signs.
                  </p>
                  <div className="bg-slate-100 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Metrics Evaluated:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <span><strong>Hemoglobin A1c:</strong> Long-term blood glucose control (optimal: &lt;5.7%)</span>
                        </li>
                        <li className="flex items-start">
                          <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <span><strong>LDL Cholesterol:</strong> Primary cardiovascular risk marker (optimal: &lt;70 mg/dL)</span>
                        </li>
                        <li className="flex items-start">
                          <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <span><strong>HDL Cholesterol:</strong> Protective cholesterol (higher is better)</span>
                        </li>
                        <li className="flex items-start">
                          <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <span><strong>Total Cholesterol:</strong> Overall lipid profile indicator</span>
                        </li>
                        <li className="flex items-start">
                          <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <span><strong>Triglycerides:</strong> Blood fat levels (optimal: &lt;100 mg/dL)</span>
                        </li>
                      </ul>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <span><strong>Lp(a):</strong> Advanced cardiovascular risk marker (optimal: &lt;50 nmol/L)</span>
                        </li>
                        <li className="flex items-start">
                          <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <span><strong>ApoB:</strong> Apolipoprotein B for particle count (optimal: &lt;80 mg/dL)</span>
                        </li>
                        <li className="flex items-start">
                          <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <span><strong>Blood Pressure:</strong> Systolic and diastolic (optimal: &lt;120/80 mmHg)</span>
                        </li>
                        <li className="flex items-start">
                          <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <span><strong>Waist-to-Height Ratio:</strong> Central adiposity indicator (optimal: &lt;0.5)</span>
                        </li>
                        <li className="flex items-start">
                          <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                          <span><strong>Lipid Ratios:</strong> LDL/Total and HDL/Total for comprehensive analysis</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="card">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Gauge className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">Step 3: Fitness Level</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Evaluates your cardiovascular fitness and functional strength, both critical
                    predictors of longevity and quality of life.
                  </p>
                  <div className="bg-slate-100 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Metrics Evaluated:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <Heart className="w-5 h-5 text-slate-600 mr-2" />
                          VO2 Max
                        </h5>
                        <p className="text-gray-700 text-sm mb-2">
                          Maximum oxygen consumption during exercise - the gold standard for
                          cardiovascular fitness. Scoring is age and gender-adjusted using
                          Cooper Institute standards.
                        </p>
                        <p className="text-gray-600 text-xs">
                          Example thresholds (males 20-29): Excellent ≥51, Good ≥40, Poor &lt;35
                        </p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <Dumbbell className="w-5 h-5 text-slate-600 mr-2" />
                          Grip Strength
                        </h5>
                        <p className="text-gray-700 text-sm mb-2">
                          Hand grip strength measured in kg - a powerful predictor of overall
                          strength, functional capacity, and mortality risk. Based on NHANES
                          and European Working Group on Sarcopenia standards.
                        </p>
                        <p className="text-gray-600 text-xs">
                          Example thresholds (males 20-29): Excellent ≥45kg, Good ≥35kg, Poor &lt;30kg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="card">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Scale className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">Step 4: Body Composition</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Analyzes your body's composition to assess metabolic health and muscle mass,
                    both crucial for longevity and functional independence.
                  </p>
                  <div className="bg-slate-100 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Metrics Evaluated:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Body Fat Percentage</h5>
                        <p className="text-gray-700 text-sm mb-2">
                          Age and gender-adjusted optimal ranges. Scoring accounts for both
                          excess fat (metabolic risk) and insufficient fat (health concerns).
                        </p>
                        <p className="text-gray-600 text-xs">
                          Example (males 20-29): Optimal 8-10.5%, Good 10.6-14.8%, Poor &gt;20%
                        </p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Skeletal Muscle Mass</h5>
                        <p className="text-gray-700 text-sm mb-2">
                          Age and gender-adjusted muscle mass scoring. Higher muscle mass is
                          associated with better metabolic health, strength, and longevity.
                          Based on European Working Group on Sarcopenia standards.
                        </p>
                        <p className="text-gray-600 text-xs">
                          Example (males 20-29): Excellent ≥42kg, Good ≥40kg, Poor &lt;32kg
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scoring Methodology */}
        <section className="mb-16">
          <div className="card">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Scoring Methodology
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Sliding Scale Scoring
                </h3>
                <p className="text-gray-700 mb-4">
                  Unlike binary pass/fail systems, HALO uses linear interpolation between
                  thresholds to provide precise scoring. This means your score reflects exactly
                  where you fall within each range, not just which category you're in.
                </p>
                <div className="bg-slate-100 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Example:</strong> If your LDL is 85 mg/dL (between optimal 70 and
                    good 99), you'll receive a score between 95-85, calculated proportionally.
                    This provides more accurate and actionable feedback than simple category
                    assignments.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Category Weighting
                </h3>
                <p className="text-gray-700 mb-4">
                  Your final score combines all four categories using evidence-based weights
                  that reflect their relative importance for longevity and health outcomes.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-100 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Metabolic Health</h4>
                    <p className="text-sm text-gray-600">
                      Cardiovascular and metabolic disease risk factors
                    </p>
                  </div>
                  <div className="bg-slate-100 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">VO2 Max</h4>
                    <p className="text-sm text-gray-600">
                      Cardiovascular fitness is a strong predictor of longevity
                    </p>
                  </div>
                  <div className="bg-slate-100 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Body Composition</h4>
                    <p className="text-sm text-gray-600">
                      Muscle mass and body fat distribution impact metabolic health
                    </p>
                  </div>
                  <div className="bg-slate-100 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Grip Strength</h4>
                    <p className="text-sm text-gray-600">
                      Functional strength indicator and mortality predictor
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Grade System
                </h3>
                <p className="text-gray-700 mb-4">
                  Your final score translates to a letter grade with clear risk assessment:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <div className="text-3xl font-bold text-green-600 mb-1">A+</div>
                    <div className="text-sm font-semibold text-green-700 mb-1">90-100</div>
                    <div className="text-xs text-green-600">Optimal – Best outcome range</div>
                  </div>
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <div className="text-3xl font-bold text-green-600 mb-1">A</div>
                    <div className="text-sm font-semibold text-green-700 mb-1">80-89</div>
                    <div className="text-xs text-green-600">Excellent – Minimal improvement needed</div>
                  </div>
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                    <div className="text-3xl font-bold text-yellow-600 mb-1">B</div>
                    <div className="text-sm font-semibold text-yellow-700 mb-1">70-79</div>
                    <div className="text-xs text-yellow-600">Good – Room for improvement</div>
                  </div>
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                    <div className="text-3xl font-bold text-orange-600 mb-1">C</div>
                    <div className="text-sm font-semibold text-orange-700 mb-1">60-69</div>
                    <div className="text-xs text-orange-600">Moderate risk – Action needed</div>
                  </div>
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                    <div className="text-3xl font-bold text-red-600 mb-1">D</div>
                    <div className="text-sm font-semibold text-red-700 mb-1">50-59</div>
                    <div className="text-xs text-red-600">High risk – Significant change needed</div>
                  </div>
                  <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                    <div className="text-3xl font-bold text-red-700 mb-1">F</div>
                    <div className="text-sm font-semibold text-red-800 mb-1">&lt;50</div>
                    <div className="text-xs text-red-700">Critical risk – Immediate support recommended</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research & Standards */}
        <section className="mb-16">
          <div className="card">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Research & Clinical Standards
            </h2>
            <p className="text-gray-700 mb-6">
              The HALO Assessment is built on established clinical guidelines and research from
              leading medical organizations:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Metabolic & Cardiovascular Health</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span><strong>ADA (American Diabetes Association):</strong> A1c thresholds and diabetes risk</span>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span><strong>AHA/ACC:</strong> Blood pressure and cardiovascular risk guidelines</span>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span><strong>ESC/EAS:</strong> European lipid management guidelines</span>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span><strong>NHANES:</strong> National Health and Nutrition Examination Survey data</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Fitness & Body Composition</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span><strong>Cooper Institute:</strong> VO2 max standards and cardiovascular fitness</span>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span><strong>European Working Group on Sarcopenia:</strong> Muscle mass thresholds</span>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span><strong>NIH:</strong> Body composition and metabolic health research</span>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="w-5 h-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span><strong>Multiple Studies:</strong> Grip strength as mortality predictor</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="mb-16">
          <div className="card bg-slate-100 border-2 border-slate-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Important Information
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Assessment Duration</h3>
                <p>
                  The complete assessment takes approximately 5 minutes to complete. You can
                  save your progress and return later if needed.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Data Requirements</h3>
                <p>
                  While more data provides a more accurate score, the assessment works with
                  partial information. Only age and gender are required; all other metrics are
                  optional but recommended for comprehensive evaluation.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Medical Disclaimer</h3>
                <p className="text-red-700 font-medium">
                  <strong>Important:</strong> The HALO Assessment is for informational and
                  educational purposes only. It is not intended to diagnose, treat, cure, or
                  prevent any disease. Results should not replace professional medical advice,
                  diagnosis, or treatment. Always consult with qualified healthcare providers
                  for medical concerns and before making significant changes to your health
                  regimen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="card bg-gradient-to-r from-slate-600 to-slate-700 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-slate-200">
              Take the assessment and discover your comprehensive health score
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-colors shadow-lg"
            >
              Start Your Assessment
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

